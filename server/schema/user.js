// 导入定义验证规则的包
const joi = require('joi')

//定义验证规则.required表示必填项
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi
    .string()
    .pattern(/^[\S]{6,12}$/)
    .required()

//定义验证表单数据的规则对象
exports.reg_login_schema = {
    body: {
        username,
        password,
    },
}