const db = require('../db/index')


exports.addgrade = (req, res) => {
    const gradeinfo = req.body
        // return res.cc('信息添加失败，请稍后再试')
    const sql = `insert into ev_grade set ?`
    db.query(sql, { uname: gradeinfo.uname, Mathematics: gradeinfo.Mathematics, Physics: gradeinfo.Physics, Algebra: gradeinfo.Algebra, Statistics: gradeinfo.Statistics }, (err, results) => {
        if (err) return res.cc(err)
            //判断行数是否为1
        if (results.affectedRows !== 1) return res.cc('信息添加失败，请稍后再试')
            //成功
            // res.send({ status: 0, message: '注册成功' })
        res.cc('添加', 0)
    })

    // exports.deleById = (req, res) => {
    //     res.send('ok')
    // }
}
exports.delegradeById = (req, res) => {
    const gradeinfo = req.body //接收id
        //UPDATE `ev_grade` SET `is_delete` = '1' WHERE (`id` = '3');
    const sql = `update ev_grade set is_delete=1 where id=?`
        // const sql = `delete from ev_grade where id=?`
    db.query(sql, gradeinfo.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除失败，请重试')
        res.cc('诶嘿', 0)
    })


}