const express = require('express')
const router = express.Router()

const grade_handler = require('../router_handler(存放路由处理函数模块)/grade')

// router.get('/dele/:id', grade_handler.deleById)
router.post('/addgrade', grade_handler.addgrade)

router.post('/dele', grade_handler.delegradeById)

//向外共享路由对象
module.exports = router