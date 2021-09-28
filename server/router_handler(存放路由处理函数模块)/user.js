//导入数据库操作模块
const db = require('../db/index')
    //导入包用来密码加密
const bcrypt = require('bcryptjs')
    //导入生成Tiken的包
const jwt = require('jsonwebtoken')
    //导入全局的配置文件
const config = require('../config')



//注册新用户的处理函数
exports.regUser = (req, res) => {
    //获取客户端提交到服务器的用户信息
    const userinfo = req.body
        //对表单数据，进行合法性校验
        // if (!userinfo.username || !userinfo.password) {
        //     return res.send({ status: 1, message: '用户名或密码不合法' })
        // }

    //定义sql语句，查询用户名是否被占用
    const sql = `select * from ev_user where username=?`
    db.query(sql, userinfo.username, (err, results) => {
        // 执行语句失败时
        if (err) {
            // return res.send({ status: 1, message: err.message })
            return res.cc(err)
        }
        // 返回的数组长度大于0表明数据库中查到了相同名字
        if (results.length > 0) {
            // return res.send({ status: 1, message: '用户名被占用,请重新输入' })
            return res.cc('用户名被占用,请重新输入')
        }
        // 调用bcrypt对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)

        //插入新用户
        const sqlStr = `insert into ev_user set ?`
            //调用db.query执行语句
        db.query(sqlStr, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) return res.cc(err)
                //判断行数是否为1
            if (results.affectedRows !== 1) return res.cc('注册失败，请稍后再试')
                //成功
                // res.send({ status: 0, message: '注册成功' })
            res.cc('注册成功', 0)
        })

    })

    // res.send('reguser ok')
}




//登录的处理函数
exports.login = (req, res) => {
    //接收表单数据
    const userinfo = req.body
        //定义sql语句
    const sql = `select * from ev_user where username=?`
        //执行sql语句
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('登录失败')
            //检查密码是否正确,因为加密后只能使用bcrypt
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult) return res.cc('登录失败')

        //在服务器端生成Token的字符串
        const user = {...results[0], password: '' }
            //对用户信息进行加密，生成Token字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
            //将toekn相应给客户端
        res.send({
            status: 0,
            message: '登陆成功',
            token: 'Bearer ' + tokenStr,
        })
    })
}