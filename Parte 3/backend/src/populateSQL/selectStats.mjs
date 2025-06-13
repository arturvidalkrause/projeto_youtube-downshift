// selectStats.mjs

import { createObjectCsvWriter } from 'csv-writer';
import pkg from '../config/db.js';
const { pool, query } = pkg;
const CSV_FILE_PATH = 'selection_results_grouped.csv';

// Define o número de vezes que cada query será executada
const BENCHMARK_RUNS = 100;

// Wrapper para executar e cronometrar uma consulta.
// Adicionado `logToConsole` para controlar o output verboso.
async function measureQuery(name, sql, logToConsole = true) {
    try {
        const startTime = performance.now();
        const result = await query(sql);
        const endTime = performance.now();
        const executionTime = endTime - startTime;

        if (logToConsole) {
            console.log(`(O) [${name}]: ${executionTime.toFixed(2)}ms, ${result.rowCount} rows`);
        }

        return {
            query_name: name,
            execution_time_ms: executionTime.toFixed(4),
            row_count: result.rowCount,
            error: 'false'
        };
    } catch (e) {
        if (logToConsole) {
            console.error(`(X) [${name}]: FALHOU. Erro: ${e.message}`);
        }
        return {
            query_name: name,
            execution_time_ms: 0,
            row_count: 0,
            error: 'true'
        };
    }
}

// === FUNÇÕES DE CÁLCULO ESTATÍSTICO ===
function calculateAverage(arr) {
    if (arr.length === 0) return 0;
    const sum = arr.reduce((acc, val) => acc + val, 0);
    return sum / arr.length;
}

function calculateStdDev(arr) {
    const n = arr.length;
    if (n < 2) return 0; // Desvio padrão não é significativo para menos de 2 amostras

    const mean = calculateAverage(arr);
    const variance = arr.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (n - 1); // Usa (n-1) para desvio padrão amostral
    return Math.sqrt(variance);
}


// Lista de todas as consultas que serão testadas (sem alterações)
const queriesToRun = [
    {
        name: 'Total-Watch-Time-Per-User',
        sql: `
            SELECT 
                u._name, 
                SUM(uwc._duration) AS total_watch_time
            FROM user_watch_content_T uwc
            JOIN user_T u ON uwc.user_nanoid = u.nanoid
            GROUP BY u.nanoid, u._name
            ORDER BY total_watch_time DESC;
        `
    },
    {
        name: 'Most-Watched-Content',
        sql: `
            SELECT 
                c._title,
                ch._name AS channel_name,
                COUNT(uwc.nanoid) AS view_count,
                SUM(uwc._duration) AS total_watch_time
            FROM user_watch_content_T uwc
            JOIN content_T c ON uwc.content_nanoid = c.nanoid
            JOIN channel_T ch ON c.channel_nanoid = ch.nanoid
            GROUP BY c.nanoid, ch.nanoid
            ORDER BY total_watch_time DESC
            LIMIT 20;
        `
    },
    {
        name: 'Content-Interaction-Counts',
        sql: `
            SELECT 
                c._title,
                ia._label AS interaction_type,
                COUNT(uic.user_nanoid) AS interaction_count
            FROM user_interaction_content_T uic
            JOIN content_T c ON uic.content_nanoid = c.nanoid
            JOIN interaction_A ia ON uic.interaction_uid = ia.uid
            GROUP BY c._title, ia._label
            ORDER BY interaction_count DESC;
        `
    },
    {
        name: 'Channel-Subscriber-Count',
        sql: `
            SELECT 
                c._name, 
                COUNT(uic.user_nanoid) as subscriber_count
            FROM user_interest_channel_T uic
            JOIN channel_T c ON uic.channel_nanoid = c.nanoid
            WHERE uic._is_sub = TRUE
            GROUP BY c.nanoid
            ORDER BY subscriber_count DESC;
        `
    },
    {
        name: 'Most-Commented-Videos',
        sql: `
            SELECT 
                v.content_nanoid,
                ct._title,
                COUNT(vc.comment_nanoid) as comment_count
            FROM video_comment_T vc
            JOIN video_T v ON vc.content_nanoid = v.content_nanoid
            JOIN content_T ct ON v.content_nanoid = ct.nanoid
            GROUP BY v.content_nanoid, ct._title
            ORDER BY comment_count DESC
            LIMIT 20;
        `
    },
    {
        name: 'Get-User-History',
        sql: `
            -- Simula a busca do histórico de um usuário específico
            SELECT
                ct._title,
                ch._name AS channel_name,
                uwc._created_at AS watched_at,
                uwc._duration AS watched_duration
            FROM user_watch_content_T uwc
            JOIN content_T ct ON uwc.content_nanoid = ct.nanoid
            JOIN channel_T ch ON ct.channel_nanoid = ch.nanoid
            WHERE uwc.user_nanoid = (SELECT nanoid FROM user_T ORDER BY _created_at DESC LIMIT 1) -- Pega um usuário aleatório/recente
            ORDER BY uwc._created_at DESC
            LIMIT 50;
        `
    },
    {
        name: 'Poll-Results-Aggregation',
        sql: `
            SELECT
                p._title,
                po._body AS option_text,
                COUNT(pr.user_nanoid) as vote_count
            FROM poll_response_T pr
            JOIN poll_option_T po ON pr.option_nanoid = po.nanoid
            JOIN poll_T p ON po.poll_nanoid = p.nanoid
            GROUP BY p._title, po._body
            ORDER BY p._title, vote_count DESC;
        `
    },
    {
        name: 'Playlist-Total-Duration',
        sql: `
            SELECT
                p._title,
                ch._name as channel_name,
                SUM(c._duration) as total_duration,
                COUNT(pc.content_nanoid) as video_count
            FROM playlist_content_T pc
            JOIN playlist_T p ON pc.playlist_nanoid = p.nanoid
            JOIN content_T c ON pc.content_nanoid = c.nanoid
            JOIN channel_T ch ON p.channel_nanoid = ch.nanoid
            GROUP BY p.nanoid, ch._name
            ORDER BY total_duration DESC;
        `
    },
    {
        name: 'Content-By-Category-And-Language',
        sql: `
            SELECT
                ca._label as category,
                la._label as language,
                COUNT(c.nanoid) as content_count
            FROM content_T c
            JOIN category_A ca ON c.category_uid = ca.uid
            JOIN language_A la ON c.language_uid = la.uid
            GROUP BY ca._label, la._label
            ORDER BY content_count DESC;
        `
    }
];

// Função principal
async function runBenchmark() {
    try {
        console.log("(i) Configurando search_path para 'downshift'...");
        await query('SET search_path TO downshift;');
        console.log("(O) search_path configurado com sucesso.");

        console.log(`\n(i) Iniciando benchmark. Cada consulta será executada ${BENCHMARK_RUNS} vezes.`);

        const csvWriter = createObjectCsvWriter({
            path: CSV_FILE_PATH,
            header: [
                { id: 'query_name', title: 'QueryName' },
                { id: 'average_ms', title: 'Average_ms' },
                { id: 'std_dev_ms', title: 'StdDev_ms' },
                { id: 'row_count', title: 'RowCount' },
                { id: 'run_count', title: 'RunCount' },
                { id: 'error', title: 'Error' }
            ],
            append: false
        });

        const allAggregatedResults = [];

        for (const queryToTest of queriesToRun) {
            const executionTimes = [];
            let lastRowCount = 0;
            let hasFailed = false;

            process.stdout.write(`(i) Executando [${queryToTest.name}]... `);

            for (let i = 0; i < BENCHMARK_RUNS; i++) {
                // Roda a query sem logar cada execução no console para não poluir
                const result = await measureQuery(queryToTest.name, queryToTest.sql, false);

                if (result.error === 'true') {
                    console.error(`\n(X) A query [${queryToTest.name}] falhou e será pulada.`);
                    hasFailed = true;
                    break;
                }
                
                executionTimes.push(parseFloat(result.execution_time_ms));
                lastRowCount = result.row_count;
            }

            if (hasFailed) {
                 allAggregatedResults.push({
                    query_name: queryToTest.name,
                    average_ms: 0,
                    std_dev_ms: 0,
                    row_count: 0,
                    run_count: BENCHMARK_RUNS,
                    error: 'true'
                });
                continue;
            }

            const averageTime = calculateAverage(executionTimes);
            const stdDevTime = calculateStdDev(executionTimes);

            console.log(`Finalizado. Média: ${averageTime.toFixed(2)}ms, Desvio Padrão: ${stdDevTime.toFixed(2)}ms`);

            allAggregatedResults.push({
                query_name: queryToTest.name,
                average_ms: averageTime.toFixed(4),
                std_dev_ms: stdDevTime.toFixed(4),
                row_count: lastRowCount,
                run_count: BENCHMARK_RUNS,
                error: 'false'
            });
        }

        await csvWriter.writeRecords(allAggregatedResults);
        console.log(`\n(Saved) Resultados agregados salvos com sucesso em: ${CSV_FILE_PATH}`);

    } catch (error) {
        console.error(`\n(Error) Ocorreu um erro crítico durante a execução do benchmark: ${error.message}`);
        console.error("O script será encerrado. Verifique a conexão com o banco de dados e se o schema 'downshift' existe.");
    }
}

// Execução
runBenchmark().finally(() => {
    console.log("\n(End) Benchmark finalizado. Fechando pool de conexões.");
    pool.end();
});