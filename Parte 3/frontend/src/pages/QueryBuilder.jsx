import React, { useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import './styles/QueryBuilder.css';
import { useAuth } from '../services/AuthContext';

// Insira seu SCHEMA completo que gerei anteriormente aqui
const SCHEMA = {
    // === TABELAS AUXILIARES (Lookup Tables) ===
    'resolution_a': {
        columns: ['uid', '_is_vertical', '_height', '_type'],
        relations: []
    },
    'member_level_a': {
        columns: ['tier', '_label'],
        relations: []
    },
    'language_a': {
        columns: ['uid', '_label'],
        relations: []
    },
    'indicative_rating_a': {
        columns: ['uid', '_label'],
        relations: []
    },
    'category_a': {
        columns: ['uid', '_label'],
        relations: []
    },
    'status_a': {
        columns: ['uid', '_label'],
        relations: []
    },
    'interaction_a': {
        columns: ['uid', '_label'],
        relations: []
    },
    'login_provider_a': {
        columns: ['uid', '_name'],
        relations: []
    },
    
    // === TABELAS PRINCIPAIS ===
    'user_t': {
        columns: ['nanoid', 'firebaseid', '_name', '_email', '_is_verified', '_profile_picture_url', '_created_at', 'sign_in_provider_uid'],
        relations: [
            { target: 'login_provider_a', on: 'user_t.sign_in_provider_uid = login_provider_a.uid' },
        ]
    },
    'channel_t': {
        columns: ['nanoid', '_url', '_created_at', '_name', '_description', '_banner_url', 'user_nanoid', 'welcome_video_nanoid'],
        relations: [
            { target: 'user_t', on: 'channel_t.user_nanoid = user_t.nanoid' },
            { target: 'video_t', on: 'channel_t.welcome_video_nanoid = video_t.content_nanoid' },
        ]
    },
    'channel_external_link_t': {
        columns: ['nanoid', 'channel_nanoid', '_url'],
        relations: [
             { target: 'channel_t', on: 'channel_external_link_t.channel_nanoid = channel_t.nanoid' },
        ]
    },
    'user_admin_channel_t': {
        columns: ['user_nanoid', 'channel_nanoid'],
        relations: [
            { target: 'user_t', on: 'user_admin_channel_t.user_nanoid = user_t.nanoid' },
            { target: 'channel_t', on: 'user_admin_channel_t.channel_nanoid = channel_t.nanoid' },
        ]
    },
    'user_interest_channel_t': {
        columns: ['user_nanoid', 'channel_nanoid', '_is_sub', '_is_notified', 'member_level_tier'],
        relations: [
            { target: 'user_t', on: 'user_interest_channel_t.user_nanoid = user_t.nanoid' },
            { target: 'channel_t', on: 'user_interest_channel_t.channel_nanoid = channel_t.nanoid' },
            { target: 'member_level_a', on: 'user_interest_channel_t.member_level_tier = member_level_a.tier' },
        ]
    },
    'content_t': {
        columns: ['nanoid', '_url', '_title', '_created_at', '_thumbnail_url', '_description', '_duration', 'status_uid', 'resolution_uid', 'category_uid', 'indicative_rating_uid', 'language_uid', 'channel_nanoid'],
        relations: [
            { target: 'status_a', on: 'content_t.status_uid = status_a.uid' },
            { target: 'resolution_a', on: 'content_t.resolution_uid = resolution_a.uid' },
            { target: 'category_a', on: 'content_t.category_uid = category_a.uid' },
            { target: 'indicative_rating_a', on: 'content_t.indicative_rating_uid = indicative_rating_a.uid' },
            { target: 'language_a', on: 'content_t.language_uid = language_a.uid' },
            { target: 'channel_t', on: 'content_t.channel_nanoid = channel_t.nanoid' },
        ]
    },
    'caption_t': {
        columns: ['language_uid', 'content_nanoid', '_body'],
        relations: [
            { target: 'language_a', on: 'caption_t.language_uid = language_a.uid' },
            { target: 'content_t', on: 'caption_t.content_nanoid = content_t.nanoid' },
        ]
    },
    'user_watch_content_t': {
        columns: ['nanoid', '_duration', '_created_at', '_is_currently_watching', 'user_nanoid', 'content_nanoid'],
        relations: [
            { target: 'user_t', on: 'user_watch_content_t.user_nanoid = user_t.nanoid' },
            { target: 'content_t', on: 'user_watch_content_t.content_nanoid = content_t.nanoid' },
        ]
    },
    'live_t': {
        columns: ['content_nanoid', '_is_live_now', '_start_time'],
        relations: [
            { target: 'content_t', on: 'live_t.content_nanoid = content_t.nanoid' },
        ]
    },
    'video_t': {
        columns: ['content_nanoid'],
        relations: [
            { target: 'content_t', on: 'video_t.content_nanoid = content_t.nanoid' },
        ]
    },
    'short_t': {
        columns: ['content_nanoid', 'cut_of_video_nanoid', '_music_url'],
        relations: [
            { target: 'content_t', on: 'short_t.content_nanoid = content_t.nanoid' },
            { target: 'video_t', on: 'short_t.cut_of_video_nanoid = video_t.content_nanoid' },
        ]
    },
    'poll_t': {
        columns: ['nanoid', '_title', '_created_at', 'channel_nanoid'],
        relations: [
            { target: 'channel_t', on: 'poll_t.channel_nanoid = channel_t.nanoid' },
        ]
    },
    'poll_option_t': {
        columns: ['nanoid', 'poll_nanoid', '_body'],
        relations: [
            { target: 'poll_t', on: 'poll_option_t.poll_nanoid = poll_t.nanoid' },
        ]
    },
    'poll_response_t': {
        columns: ['user_nanoid', 'option_nanoid', '_created_at'],
        relations: [
            { target: 'user_t', on: 'poll_response_t.user_nanoid = user_t.nanoid' },
            { target: 'poll_option_t', on: 'poll_response_t.option_nanoid = poll_option_t.nanoid' },
        ]
    },
    'comment_t': {
        columns: ['nanoid', '_created_at', '_is_edited', '_body', 'user_nanoid'],
        relations: [
            { target: 'user_t', on: 'comment_t.user_nanoid = user_t.nanoid' },
        ]
    },
    'video_comment_t': {
        columns: ['comment_nanoid', 'content_nanoid'],
        relations: [
            { target: 'comment_t', on: 'video_comment_t.comment_nanoid = comment_t.nanoid' },
            { target: 'video_t', on: 'video_comment_t.content_nanoid = video_t.content_nanoid' },
        ]
    },
    'live_comment_t': {
        columns: ['comment_nanoid', 'content_nanoid'],
        relations: [
            { target: 'comment_t', on: 'live_comment_t.comment_nanoid = comment_t.nanoid' },
            { target: 'live_t', on: 'live_comment_t.content_nanoid = live_t.content_nanoid' },
        ]
    },
    'short_comment_t': {
        columns: ['comment_nanoid', 'content_nanoid'],
        relations: [
            { target: 'comment_t', on: 'short_comment_t.comment_nanoid = comment_t.nanoid' },
            { target: 'short_t', on: 'short_comment_t.content_nanoid = short_t.content_nanoid' },
        ]
    },
    'comment_reply_t': {
        columns: ['reply_comment_nanoid', 'target_comment_nanoid'],
        relations: [
            { target: 'comment_t', on: 'comment_reply_t.reply_comment_nanoid = comment_t.nanoid' },
            { target: 'comment_t', on: 'comment_reply_t.target_comment_nanoid = comment_t.nanoid' },
        ]
    },
    'poll_comment_t': {
        columns: ['comment_nanoid', 'poll_nanoid'],
        relations: [
            { target: 'comment_t', on: 'poll_comment_t.comment_nanoid = comment_t.nanoid' },
            { target: 'poll_t', on: 'poll_comment_t.poll_nanoid = poll_t.nanoid' },
        ]
    },
    'playlist_t': {
        columns: ['nanoid', '_url', '_title', '_description', '_thumbnail_url', 'status_uid', 'channel_nanoid'],
        relations: [
            { target: 'status_a', on: 'playlist_t.status_uid = status_a.uid' },
            { target: 'channel_t', on: 'playlist_t.channel_nanoid = channel_t.nanoid' },
        ]
    },
    'playlist_content_t': {
        columns: ['playlist_nanoid', 'content_nanoid', '_inserted_at', '_play_content_order'],
        relations: [
            { target: 'playlist_t', on: 'playlist_content_t.playlist_nanoid = playlist_t.nanoid' },
            { target: 'content_t', on: 'playlist_content_t.content_nanoid = content_t.nanoid' },
        ]
    },
    'user_interaction_content_t': {
        columns: ['user_nanoid', 'content_nanoid', 'interaction_uid'],
        relations: [
            { target: 'user_t', on: 'user_interaction_content_t.user_nanoid = user_t.nanoid' },
            { target: 'content_t', on: 'user_interaction_content_t.content_nanoid = content_t.nanoid' },
            { target: 'interaction_a', on: 'user_interaction_content_t.interaction_uid = interaction_a.uid' },
        ]
    },
    'user_interaction_playlist_t': {
        columns: ['user_nanoid', 'playlist_nanoid', 'interaction_uid'],
        relations: [
            { target: 'user_t', on: 'user_interaction_playlist_t.user_nanoid = user_t.nanoid' },
            { target: 'playlist_t', on: 'user_interaction_playlist_t.playlist_nanoid = playlist_t.nanoid' },
            { target: 'interaction_a', on: 'user_interaction_playlist_t.interaction_uid = interaction_a.uid' },
        ]
    },
    'user_interaction_comment_t': {
        columns: ['user_nanoid', 'comment_nanoid', 'interaction_uid'],
        relations: [
            { target: 'user_t', on: 'user_interaction_comment_t.user_nanoid = user_t.nanoid' },
            { target: 'comment_t', on: 'user_interaction_comment_t.comment_nanoid = comment_t.nanoid' },
            { target: 'interaction_a', on: 'user_interaction_comment_t.interaction_uid = interaction_a.uid' },
        ]
    },
    'notification_t': {
        columns: ['nanoid', '_body', 'channel_nanoid'],
        relations: [
            { target: 'channel_t', on: 'notification_t.channel_nanoid = channel_t.nanoid' },
        ]
    },
    'user_notified_t': {
        columns: ['user_nanoid', 'notification_nanoid', '_sent_at', '_was_read'],
        relations: [
            { target: 'user_t', on: 'user_notified_t.user_nanoid = user_t.nanoid' },
            { target: 'notification_t', on: 'user_notified_t.notification_nanoid = notification_t.nanoid' },
        ]
    },
    'tag_t': {
        columns: ['nanoid', '_label'],
        relations: []
    },
    'playlist_tag_t': {
        columns: ['playlist_nanoid', 'tag_nanoid'],
        relations: [
            { target: 'playlist_t', on: 'playlist_tag_t.playlist_nanoid = playlist_t.nanoid' },
            { target: 'tag_t', on: 'playlist_tag_t.tag_nanoid = tag_t.nanoid' },
        ]
    },
    'content_tag_t': {
        columns: ['content_nanoid', 'tag_nanoid'],
        relations: [
            { target: 'content_t', on: 'content_tag_t.content_nanoid = content_t.nanoid' },
            { target: 'tag_t', on: 'content_tag_t.tag_nanoid = tag_t.nanoid' },
        ]
    }
};

const AGGREGATE_FUNCTIONS = ['NONE', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX'];

const QueryBuilder = () => {
    const [mainTable, setMainTable] = useState('user_t');
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [joins, setJoins] = useState([]);
    const [filters, setFilters] = useState([]);
    const [groupBy, setGroupBy] = useState([]);
    const [orderBy, setOrderBy] = useState({ column: '', direction: 'ASC' });
    const [limit, setLimit] = useState(25);
    
    const [lookupCache, setLookupCache] = useState({});
    const [loadingLookup, setLoadingLookup] = useState({});

    const [queryResult, setQueryResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { currentUser } = useAuth();

    const fetchLookupValues = useCallback(async (columnIdentifier) => {
        // A CORREÇÃO ESTÁ AQUI: Adicionamos a verificação !currentUser
        if (!currentUser || !columnIdentifier || !columnIdentifier.includes('_a.')) return;
        if (lookupCache[columnIdentifier]) return;

        const [tableName, columnName] = columnIdentifier.split('.');
        setLoadingLookup(prev => ({ ...prev, [columnIdentifier]: true }));
        try {
            const token = await currentUser.getIdToken();
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/query/lookup/${tableName}/${columnName}`, config);
            setLookupCache(prev => ({ ...prev, [columnIdentifier]: response.data }));
        } catch (err) {
            console.error(`Falha ao buscar lookup para ${columnIdentifier}:`, err);
            setLookupCache(prev => ({ ...prev, [columnIdentifier]: [] }));
        } finally {
            setLoadingLookup(prev => ({ ...prev, [columnIdentifier]: false }));
        }
    }, [currentUser, lookupCache]);

    const getAvailableColumns = useMemo(() => {
        let columns = SCHEMA[mainTable] ? SCHEMA[mainTable].columns.map(c => `${mainTable}.${c}`) : [];
        joins.forEach(join => {
            const joinTableColumns = SCHEMA[join.targetTable] ? SCHEMA[join.targetTable].columns.map(c => `${join.targetTable}.${c}`) : [];
            columns = [...columns, ...joinTableColumns];
        });
        return [...new Set(columns)];
    }, [mainTable, joins]);

    const handleMainTableChange = (newTable) => {
        setMainTable(newTable);
        setSelectedColumns([]);
        setJoins([]);
        setFilters([]);
        setGroupBy([]);
        setOrderBy({ column: '', direction: 'ASC' });
        setQueryResult(null);
    };

    const handleAddJoin = (relation) => {
        const [left, right] = relation.on.split(' = ');
        const newJoin = { type: 'INNER', targetTable: relation.target, on: { left, right } };
        if (!joins.some(j => j.targetTable === newJoin.targetTable)) {
            setJoins([...joins, newJoin]);
        }
    };

    const handleAddColumn = () => {
        setSelectedColumns([...selectedColumns, { column: '', aggregate: 'NONE', alias: '' }]);
    };

    const handleUpdateColumn = (index, field, value) => {
        const newColumns = [...selectedColumns];
        const currentColumn = newColumns[index];
        newColumns[index] = { ...currentColumn, [field]: value };

        if (field === 'column' && value === '*') {
            newColumns[index].aggregate = 'COUNT';
        }
        
        if(field === 'aggregate' && value === 'NONE') {
            setGroupBy(prevGroupBy => prevGroupBy.filter(gb => gb !== currentColumn.column));
        }

        setSelectedColumns(newColumns);
    };

    const handleRemoveColumn = (index) => {
        const removedColumn = selectedColumns[index];
        setGroupBy(prevGroupBy => prevGroupBy.filter(gb => gb !== removedColumn.column));
        setSelectedColumns(selectedColumns.filter((_, i) => i !== index));
    };

    const handleAddFilter = () => setFilters([...filters, { column: '', operator: '=', value: '', conjunction: 'AND' }]);

    const handleUpdateFilter = (index, field, value) => {
        const newFilters = [...filters];
        const oldColumn = newFilters[index].column;
        newFilters[index][field] = value;
        
        if (field === 'column') {
            newFilters[index].value = '';
            if(value !== oldColumn) {
                fetchLookupValues(value);
            }
        }
        setFilters(newFilters);
    };

    const handleRemoveFilter = (index) => setFilters(filters.filter((_, i) => i !== index));

    const availableGroupByColumns = useMemo(() => {
        return selectedColumns
            .filter(c => c.column && c.column !== '*' && (!c.aggregate || c.aggregate === 'NONE'))
            .map(c => c.column);
    }, [selectedColumns]);
    
    const availableOrderByColumns = useMemo(() => {
        const aliased = selectedColumns.filter(c => c.alias).map(c => c.alias);
        const nonAliased = getAvailableColumns;
        return [...new Set([...aliased, ...nonAliased])];
    }, [selectedColumns, getAvailableColumns]);

    const handleSubmitQuery = async () => {
        setLoading(true);
        setError('');
        setQueryResult(null);
        
        if (!currentUser) {
            setError('Usuário não autenticado. Faça o login para continuar.');
            setLoading(false);
            return;
        }

        if (selectedColumns.some(c => !c.column)) {
            setError('Todas as colunas selecionadas devem ser preenchidas.');
            setLoading(false);
            return;
        }

        const queryPayload = {
            table: mainTable,
            columns: selectedColumns.map(c => ({
                ...c,
                aggregate: c.aggregate === 'NONE' ? null : c.aggregate,
            })),
            joins: joins,
            filters: filters,
            groupBy: groupBy.length > 0 ? groupBy : undefined,
            orderBy: orderBy.column ? orderBy : undefined,
            limit: limit,
        };

        try {
            const token = await currentUser.getIdToken();
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.post('/api/query', queryPayload, config);
            setQueryResult(response.data);
        } catch (err) {
            setError(err.response?.data?.details || err.response?.data?.error || err.message || 'Ocorreu um erro desconhecido.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="query-builder">
            <h1>Construtor de Queries SQL</h1>

            <div className="card">
                <h3>1. Fonte de Dados (FROM & JOINs)</h3>
                <label>Tabela Principal</label>
                <select value={mainTable} onChange={e => handleMainTableChange(e.target.value)}>
                    {Object.keys(SCHEMA).map(table => <option key={table} value={table}>{table}</option>)}
                </select>

                {SCHEMA[mainTable]?.relations.length > 0 && (
                    <div style={{marginTop: '1rem'}}>
                        <h4>Adicionar Joins (Relações)</h4>
                        {SCHEMA[mainTable].relations.map(rel => (
                            <button key={rel.on} onClick={() => handleAddJoin(rel)} className="join-btn" disabled={joins.some(j => j.targetTable === rel.target)}>
                                JOIN com {rel.target} {joins.some(j => j.targetTable === rel.target) && '(Adicionado)'}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="card">
                <h3>2. Colunas (SELECT)</h3>
                {selectedColumns.map((col, index) => (
                    <div key={index} className="filter-row" style={{alignItems: 'flex-end'}}>
                        <div style={{flex: 2}}>
                            <label>Coluna</label>
                            <select value={col.column} onChange={e => handleUpdateColumn(index, 'column', e.target.value)}>
                                <option value="">Selecione...</option>
                                <option value="*">COUNT(*)</option>
                                {getAvailableColumns.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div style={{flex: 1}}>
                            <label>Agregação</label>
                            <select value={col.aggregate} onChange={e => handleUpdateColumn(index, 'aggregate', e.target.value)} disabled={col.column === '*'}>
                                {AGGREGATE_FUNCTIONS.map(agg => <option key={agg} value={agg}>{agg}</option>)}
                            </select>
                        </div>
                        <div style={{flex: 2}}>
                            <label>Alias (Opcional)</label>
                            <input type="text" placeholder="ex: total_de_usuarios" value={col.alias} onChange={e => handleUpdateColumn(index, 'alias', e.target.value)} />
                        </div>
                        <button onClick={() => handleRemoveColumn(index)} className="btn-danger btn-small">X</button>
                    </div>
                ))}
                <button onClick={handleAddColumn}>+ Adicionar Coluna</button>
            </div>
            
            <div className="card">
                <h3>3. Filtros (WHERE)</h3>
                {filters.map((filter, index) => {
                    const isLookupColumn = filter.column.includes('_a.');
                    const lookupOptions = lookupCache[filter.column];
                    const isLoading = loadingLookup[filter.column];

                    return (
                        <div key={index} className="filter-row">
                            {index > 0 && <select value={filter.conjunction} onChange={e => handleUpdateFilter(index, 'conjunction', e.target.value)}><option>AND</option><option>OR</option></select>}
                            <select value={filter.column} onChange={e => handleUpdateFilter(index, 'column', e.target.value)}>
                                <option value="">Selecione a coluna</option>
                                {getAvailableColumns.map(col => <option key={col} value={col}>{col}</option>)}
                            </select>
                            <select value={filter.operator} onChange={e => handleUpdateFilter(index, 'operator', e.target.value)}>
                               <option>=</option><option>!=</option><option>&gt;</option><option>&lt;</option><option>&gt;=</option><option>&lt;=</option><option>LIKE</option><option>ILIKE</option><option>IS NULL</option><option>IS NOT NULL</option>
                            </select>

                            {isLookupColumn ? (
                                <select 
                                    value={filter.value} 
                                    onChange={e => handleUpdateFilter(index, 'value', e.target.value)}
                                    disabled={isLoading || filter.operator === 'IS NULL' || filter.operator === 'IS NOT NULL'}
                                >
                                    {isLoading ? (
                                        <option>Carregando...</option>
                                    ) : (
                                        <>
                                            <option value="">Selecione um valor</option>
                                            {lookupOptions?.map(opt => <option key={opt} value={String(opt)}>{String(opt)}</option>)}
                                        </>
                                    )}
                                </select>
                            ) : (
                                <input 
                                    type="text" 
                                    value={filter.value} 
                                    placeholder="Valor" 
                                    onChange={e => handleUpdateFilter(index, 'value', e.target.value)} 
                                    disabled={filter.operator === 'IS NULL' || filter.operator === 'IS NOT NULL'} 
                                />
                            )}

                            <button onClick={() => handleRemoveFilter(index)}>X</button>
                        </div>
                    );
                })}
                <button onClick={handleAddFilter}>+ Adicionar Filtro</button>
            </div>

            <div className="card">
                <h3>4. Agrupamento, Ordenação e Limite</h3>
                <div className="form-group">
                    <label>Agrupar Por (GROUP BY)</label>
                    <p className="field-hint">Selecione as colunas para agrupar. Apenas colunas sem função de agregação estão disponíveis.</p>
                    <p className="field-hint">Para selecionar mais de uma coluna, segure a tecla CTRL.</p>
                    <select multiple value={groupBy} onChange={e => setGroupBy(Array.from(e.target.selectedOptions, option => option.value))} style={{height: '100px'}}>
                        {availableGroupByColumns.map(col => <option key={col} value={col}>{col}</option>)}
                    </select>
                </div>
                <div className="order-limit-grid">
                    <div>
                        <label>Ordenar Por</label>
                        <select value={orderBy.column} onChange={e => setOrderBy({...orderBy, column: e.target.value})}>
                            <option value="">Nenhuma</option>
                            {availableOrderByColumns.map(col => <option key={col} value={col}>{col}</option>)}
                        </select>
                    </div>
                    <div>
                        <label>Direção</label>
                        <select value={orderBy.direction} onChange={e => setOrderBy({...orderBy, direction: e.target.value})}>
                            <option>ASC</option><option>DESC</option>
                        </select>
                    </div>
                    <div>
                        <label>Limite</label>
                        <input type="number" value={limit} onChange={e => setLimit(e.target.value)} placeholder="Nº de linhas" />
                    </div>
                </div>
            </div>

            <button onClick={handleSubmitQuery} disabled={loading || selectedColumns.length === 0} className="execute-btn">
                {loading ? 'Executando...' : 'Executar SELECT'}
            </button>
            
            {error && <div className="error-box">{error}</div>}
            
            {queryResult && (
                <div className="card results-box">
                    <h3>Resultados ({queryResult.length} linhas)</h3>
                    {queryResult.length > 0 ? (
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>{Object.keys(queryResult[0]).map(key => <th key={key}>{key}</th>)}</tr>
                                </thead>
                                <tbody>
                                    {queryResult.map((row, i) => (
                                        <tr key={i}>
                                            {Object.values(row).map((val, j) => <td key={j}>{String(val ?? '')}</td>)}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : <p>Nenhum resultado encontrado.</p>}
                </div>
            )}
        </div>
    );
};

export default QueryBuilder;