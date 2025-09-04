const { query } = require('../config/db');

async function getResolutionsFromDB(type, isVertical, debug) {
	const sql = `
        SELECT _height 
        FROM downshift.resolution_a 
        WHERE _type = $1 AND _is_vertical = $2 
        ORDER BY _height ASC;
    `;
	const params = [type, isVertical];

	if (debug) console.log('Executing query:', sql, 'with params:', params);

	try {
		const res = await query(sql, params);
		return res.rows.map(r => r._height);
	} catch (err) {
		throw new Error(`getResolutionsFromDB: ${err}`);
	}
}

module.exports = { getResolutionsFromDB };