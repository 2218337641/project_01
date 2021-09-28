const express = require('express')
const router = express.Router()



//导入路由处理函数模块
const userall_handler = require('../router_handler(存放路由处理函数模块)/allu')
    //获取用户基本信息
router.get('/userall', userall_handler.getUserAll)

module.exports = router