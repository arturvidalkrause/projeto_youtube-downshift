const { query } = require('../config/db');

async function getResolutionsFromDB(type, isVertical) {
    const sql = `
        SELECT reso_value 
        FROM resolution 
        WHERE reso_type = $1 AND reso_is_vertical = $2 
        ORDER BY reso_value ASC;
    `;
    const params = [type, isVertical];

    console.log('Executing query:', sql, 'with params:', params);

    try {
        const res = await query(sql, params);
        return res.rows.map(r => r.reso_value);
    } catch (err) {
        console.error("Error executing getResolutionsFromDB:", err);
        return [];
    }
}

module.exports = { getResolutionsFromDB };