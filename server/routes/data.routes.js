const Router = require('express')
const router = new Router()
const dataController = require('../controller/data.controller')

router.get('/data', dataController.getData);

module.exports = router