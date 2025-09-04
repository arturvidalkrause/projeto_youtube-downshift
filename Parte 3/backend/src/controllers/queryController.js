// backend/src/controllers/queryController.js
const express = require('express');
const { query } = require('../config/db');

const ALLOWED_TABLES = {
    // Tabelas Auxiliares
    'resolution_a': ['uid', '_is_vertical', '_height', '_type'],
    'member_level_a': ['tier', '_label'],
    'language_a': ['uid', '_label'],
    'indicative_rating_a': ['uid', '_label'],
    'category_a': ['uid', '_label'],
    'status_a': ['uid', '_label'],
    'interaction_a': ['uid', '_label'],
    'login_provider_a': ['uid', '_name'],

    // Tabelas Principais
    'user_t': ['nanoid', 'firebaseid', '_name', '_email', '_is_verified', '_profile_picture_url', '_created_at', 'sign_in_provider_uid'],
    'channel_t': ['nanoid', '_url', '_created_at', '_name', '_description', '_banner_url', 'user_nanoid', 'welcome_video_nanoid'],
    'channel_external_link_t': ['nanoid', 'channel_nanoid', '_url'],
    'user_admin_channel_t': ['user_nanoid', 'channel_nanoid'],
    'user_interest_channel_t': ['user_nanoid', 'channel_nanoid', '_is_sub', '_is_notified', 'member_level_tier'],
    'content_t': ['nanoid', '_url', '_title', '_created_at', '_thumbnail_url', '_description', '_duration', 'status_uid', 'resolution_uid', 'category_uid', 'indicative_rating_uid', 'language_uid', 'channel_nanoid'],
    'caption_t': ['language_uid', 'content_nanoid', '_body'],
    'user_watch_content_t': ['nanoid', '_duration', '_created_at', '_is_currently_watching', 'user_nanoid', 'content_nanoid'],
    'live_t': ['content_nanoid', '_is_live_now', '_start_time'],
    'video_t': ['content_nanoid'],
    'short_t': ['content_nanoid', 'cut_of_video_nanoid', '_music_url'],
    'poll_t': ['nanoid', '_title', '_created_at', 'channel_nanoid'],
    'poll_option_t': ['nanoid', 'poll_nanoid', '_body'],
    'poll_response_t': ['user_nanoid', 'option_nanoid', '_created_at'],
    'comment_t': ['nanoid', '_created_at', '_is_edited', '_body', 'user_nanoid'],
    'video_comment_t': ['comment_nanoid', 'content_nanoid'],
    'live_comment_t': ['comment_nanoid', 'content_nanoid'],
    'short_comment_t': ['comment_nanoid', 'content_nanoid'],
    'comment_reply_t': ['reply_comment_nanoid', 'target_comment_nanoid'],
    'poll_comment_t': ['comment_nanoid', 'poll_nanoid'],
    'playlist_t': ['nanoid', '_url', '_title', '_description', '_thumbnail_url', 'status_uid', 'channel_nanoid'],
    'playlist_content_t': ['playlist_nanoid', 'content_nanoid', '_inserted_at', '_play_content_order'],
    'user_interaction_content_t': ['user_nanoid', 'content_nanoid', 'interaction_uid'],
    'user_interaction_playlist_t': ['user_nanoid', 'playlist_nanoid', 'interaction_uid'],
    'user_interaction_comment_t': ['user_nanoid', 'comment_nanoid', 'interaction_uid'],
    'notification_t': ['nanoid', '_body', 'channel_nanoid'],
    'user_notified_t': ['user_nanoid', 'notification_nanoid', '_sent_at', '_was_read'],
    'tag_t': ['nanoid', '_label'],
    'playlist_tag_t': ['playlist_nanoid', 'tag_nanoid'],
    'content_tag_t': ['content_nanoid', 'tag_nanoid'],
};

const ALLOWED_AGGREGATES = ['COUNT', 'SUM', 'AVG', 'MIN', 'MAX'];
const ALLOWED_OPERATORS = ['=', '!=', '>', '<', '>=', '<=', 'LIKE', 'ILIKE', 'IN', 'IS NULL', 'IS NOT NULL'];
const ALLOWED_DIRECTIONS = ['ASC', 'DESC'];

// Função auxiliar para validar e formatar um identificador de coluna
const formatColumn = (columnIdentifier) => {
    if (!columnIdentifier || typeof columnIdentifier !== 'string') throw new Error('Identificador de coluna inválido.');
    
    // Caso especial para COUNT(*)
    if (columnIdentifier.trim() === '*') return '*';

    const [tableName, colName] = columnIdentifier.split('.');
    if (!tableName || !colName) throw new Error(`Formato de coluna inválido: ${columnIdentifier}. Use "tabela.coluna".`);
    if (!ALLOWED_TABLES[tableName] || !ALLOWED_TABLES[tableName].includes(colName)) {
        throw new Error(`Coluna não permitida: ${columnIdentifier}`);
    }
    return `downshift."${tableName}"."${colName}"`;
};


exports.executeQuery = async (req, res) => {
    const { table, columns, joins, filters, groupBy, orderBy, limit } = req.body;
    try {
        // --- VALIDAÇÃO DE SEGURANÇA ---
        if (!table || !ALLOWED_TABLES[table]) {
            return res.status(400).json({ error: `Tabela inválida ou não permitida: ${table}` });
        }

        if (!columns || !Array.isArray(columns) || columns.length === 0) {
            return res.status(400).json({ error: 'A query deve ter ao menos uma coluna de seleção.' });
        }

        // --- CONSTRUÇÃO DA QUERY SEGURA ---
        const queryParams = [];
        let paramIndex = 1;

        // 1. Cláusula SELECT
        const selectClause = columns.map(col => {
            if (!col || !col.column) throw new Error('Objeto de coluna inválido.');
            
            const formattedCol = formatColumn(col.column);
            let selectPart = formattedCol;

            if (col.aggregate) {
                if (!ALLOWED_AGGREGATES.includes(col.aggregate.toUpperCase())) {
                    throw new Error(`Agregação não permitida: ${col.aggregate}`);
                }
                // Garante que COUNT(*) é tratado corretamente
                const argument = formattedCol === '*' ? '*' : formattedCol;
                selectPart = `${col.aggregate.toUpperCase()}(${argument})`;
            }

            if (col.alias) {
                 // Valida o alias para evitar injeção. Permite apenas caracteres alfanuméricos e underscores.
                if (!/^[a-zA-Z0-9_]+$/.test(col.alias)) {
                    throw new Error(`Alias inválido: ${col.alias}. Use apenas letras, números e underscore.`);
                }
                selectPart += ` AS "${col.alias}"`;
            }
            return selectPart;
        }).join(', ');
        
        // 2. Cláusula FROM
        let fromClause = `downshift."${table}"`;

        // 3. Cláusula JOIN
        let joinClause = '';
        if (joins && joins.length > 0) {
            joinClause = joins.map(join => {
                if (!ALLOWED_TABLES[join.targetTable]) throw new Error(`Tentativa de JOIN com tabela não permitida: ${join.targetTable}`);
                const [baseTable, baseCol] = join.on.left.split('.');
                const [targetTable, targetCol] = join.on.right.split('.');
                if (!ALLOWED_TABLES[baseTable]?.includes(baseCol) || !ALLOWED_TABLES[targetTable]?.includes(targetCol)) {
                    throw new Error(`Coluna de JOIN inválida: ${join.on.left} ou ${join.on.right}`);
                }
                return ` ${join.type || 'INNER'} JOIN downshift."${join.targetTable}" ON downshift."${baseTable}"."${baseCol}" = downshift."${targetTable}"."${targetCol}"`;
            }).join('');
        }

        // 4. Cláusula WHERE
        let whereClause = '';
        if (filters && filters.length > 0) {
            whereClause = ' WHERE ' + filters.filter(f => f.column && f.operator).map((filter, index) => {
                const formattedCol = formatColumn(filter.column);
                if (!ALLOWED_OPERATORS.includes(filter.operator.toUpperCase())) throw new Error(`Operador de filtro inválido: ${filter.operator}`);
                
                const conjunction = index > 0 ? (filter.conjunction || 'AND') : '';
                
                if (filter.operator.toUpperCase() === 'IS NULL' || filter.operator.toUpperCase() === 'IS NOT NULL') {
                    return ` ${conjunction} ${formattedCol} ${filter.operator.toUpperCase()}`;
                } else {
                    queryParams.push(filter.value);
                    return ` ${conjunction} ${formattedCol} ${filter.operator.toUpperCase()} $${paramIndex++}`;
                }
            }).join('');
        }
        
        // 5. Cláusula GROUP BY
        let groupByClause = '';
        if (groupBy && groupBy.length > 0) {
            const groupByColumns = groupBy.map(col => formatColumn(col)).join(', ');
            groupByClause = ` GROUP BY ${groupByColumns}`;
        }

        // 6. Cláusula ORDER BY
        let orderByClause = '';
        if (orderBy && orderBy.column) {
            // A ordenação pode ser por uma coluna selecionada ou por um alias
            const orderCol = columns.find(c => c.alias === orderBy.column);
            let orderByTarget;
            if(orderCol && orderCol.alias) {
                 // Se for um alias, já foi validado. É seguro usar diretamente.
                orderByTarget = `"${orderBy.column}"`
            } else {
                orderByTarget = formatColumn(orderBy.column);
            }
            
            const direction = ALLOWED_DIRECTIONS.includes(orderBy.direction.toUpperCase()) ? orderBy.direction.toUpperCase() : 'ASC';
            orderByClause = ` ORDER BY ${orderByTarget} ${direction}`;
        }

        // 7. Cláusula LIMIT
        let limitClause = '';
        if (limit) {
            const limitValue = parseInt(limit, 10);
            if (!isNaN(limitValue) && limitValue > 0) {
                queryParams.push(limitValue);
                limitClause = ` LIMIT $${paramIndex++}`;
            }
        }
        
        const finalQuery = `SELECT ${selectClause} FROM ${fromClause}${joinClause}${whereClause}${groupByClause}${orderByClause}${limitClause};`;

        console.log("Executando Query:", finalQuery);
        console.log("Com Parâmetros:", queryParams);

        const result = await query(finalQuery, queryParams);
        res.status(200).json(result.rows);

    } catch (err) {
        console.error('Erro ao executar a query:', err);
        res.status(500).json({ error: 'Erro no servidor ao processar a query.', details: err.message });
    }
};

exports.getLookupValues = async (req, res) => {
    const { tableName, columnName } = req.params;

    try {
        // --- VALIDAÇÃO DE SEGURANÇA ---
        // 1. Apenas tabelas auxiliares (_a) são permitidas nesta rota.
        if (!tableName.endsWith('_a')) {
            return res.status(403).json({ error: 'Acesso permitido apenas para tabelas auxiliares.' });
        }

        // 2. Verifica se a tabela e a coluna estão na lista de permissões.
        if (!ALLOWED_TABLES[tableName] || !ALLOWED_TABLES[tableName].includes(columnName)) {
            return res.status(400).json({ error: `Tabela ou coluna inválida/não permitida: ${tableName}.${columnName}` });
        }

        // --- EXECUÇÃO DA QUERY ---
        const finalQuery = `SELECT DISTINCT "${columnName}" FROM downshift."${tableName}" ORDER BY 1;`;
        
        console.log("Executando Query de Lookup:", finalQuery);

        const result = await query(finalQuery);

        // Retorna um array simples de valores. Ex: ['Público', 'Privado', 'Não Listado']
        const values = result.rows.map(row => row[columnName]);
        
        res.status(200).json(values);

    } catch (err) {
        console.error('Erro ao buscar valores de lookup:', err);
        res.status(500).json({ error: 'Erro no servidor ao processar a requisição.', details: err.message });
    }
};