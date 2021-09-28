//导入数据库操作模块
const db = require('../db/index')

//获取用户信息的处理函数
exports.getUserInfo = (req, res) => {
    const sql = `select id,username from ev_user where id=?`
        //只要身份认证成功，就会自动生成req.user这个对象
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取用户信息失败！')
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results[0],
        })
    })
}