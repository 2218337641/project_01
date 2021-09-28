const express = require('express')
const app = express()

const joi = require('joi')

//导入cors中间件
const cors = require('cors')
app.use(cors())

//配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))

//配置res.cc函数用来代替频繁的send
app.use((req, res, next) => {
    //status默认为1，表示失败
    //err的值可能是一个错误对象，也可能是一个错误的描述字符串
    res.cc = function(err, status = 1) {
        res.send({
            status,
            //Error是错误对象,err是字符串,instanceof表示是否是?
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

//在路由之前配置解析Token的中间件
const expressJWT = require('express-jwt')
const config = require('./config')

app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }))

//导入并使用用户路由模块
const userRouter = require('./router(存放路由模块)/user')
app.use('/api', userRouter)
    // 导入并使用用户信息的路由模块
const userinfoRouter = require('./router(存放路由模块)/userinfo')
app.use('/my', userinfoRouter)

//导入所有信息模块
const userall = require('./router(存放路由模块)/allu')
app.use('/my', userall)

//导入添加和删除信息模块
const info = require('./router(存放路由模块)/grade')
app.use('/api', info)



//定义错误级别的中间件
app.use((err, req, res, next) => {
    //验证失败导致的错误
    if (err instanceof joi.ValidationError) return res.cc(err)
        //身份认证失败
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')
        //未知的错误
    res.cc(err)
})

app.listen(3007, () => {
    console.log('server running at http://127.0.0.1:3007')
})