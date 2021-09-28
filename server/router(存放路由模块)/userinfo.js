const express = require('express')
const router = express.Router()



//导入路由处理函数模块
const userinfo_handler = require('../router_handler(存放路由处理函数模块)/userinfo')
    //获取用户基本信息
router.get('/userinfo', userinfo_handler.getUserInfo)

module.exports = router