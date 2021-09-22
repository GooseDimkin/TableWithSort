const db = require('../db')

class DataController {
    async getData(req, res) {
        const data = await db.query('SELECT * FROM testtable')
        res.json(data.rows)
    }
};

module.exports = new DataController()