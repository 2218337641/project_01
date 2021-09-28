$(function() {
    // 调用 getUserInfo 获取用户基本信息
    // getUserInfo()
    getUserAll()
        // 监听注册表单的提交事件
    $('#form_gra').on('submit', function(e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
            // 2. 发起Ajax的POST请求
        var data = {
            uname: $('#form_gra [name=uname]').val(),
            Mathematics: $('#form_gra [name=Mathematics]').val(),
            Physics: $('#form_gra [name=Physics]').val(),
            Algebra: $('#form_gra [name=Physics]').val(),
            Statistics: $('#form_gra [name=Physics]').val()
        }
        $.post('/api/addgrade', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('添加成功')
            getUserAll()
        })
    })


    $('tbody').on('click', '#del', function() {
        var idt = $(this).attr('data-id');
        var data = {
            id: idt
        }
        $.post('/api/dele', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('删除成功')
            getUserAll()
        })

    })
})

// // 获取用户的基本信息,渲染界面
// function getUserInfo() {
//     $.ajax({
//         method: 'GET',
//         url: '/api/userinfo',
//         success: function(res) {
//             if (res.status !== 0) {
//                 console.log('登录失败！')
//             }
//             renderAvatar(res.data)
//         }
//     })                                               //  /my被JWT拦截了，离谱
// }                                                    //  要再看一遍token才行

// 获得数据
function getUserAll() {
    $.ajax({
        method: 'GET',
        url: '/my/userall',
        success: function(res) {
            if (res.status !== 0) {
                console.log('获取失败！')
            }
            rema(res.data)
        }
    })
}

function rema(user) {
    var rows = []
    var a = [];
    var b = [];
    var c = [];
    var d = [];
    var Mathematics = []
    var Physics = []
    var Algebra = []
    var Statistics = []
    $.each(user, function(i, item) {
            rows.push('<tr><td>' + item.id + '</td><td>' + item.uname + '</td><td>' + item.Mathematics + '</td><td>' + item.Physics + '</td><td>' + item.Algebra + '</td><td>' + item.Statistics + '<td><a href="javascript:;" id="del" data-id="' + item.id + '">删除</a></td></tr>')

            Mathematics.push(parseInt(item.Mathematics))
            Physics.push(parseInt(item.Physics))
            Algebra.push(parseInt(item.Algebra))
            Statistics.push(parseInt(item.Statistics))

        })
        // console.log(Mathematics)
    a.push('<tr><td>高数</td><td>' + Math.max.apply(null, Mathematics) + '</td><td>' + Math.min.apply(null, Mathematics) + '</td><td>' + avg.apply(null, Mathematics) + '</td><td>' + qualify.apply(null, Mathematics) + '</td></tr>')

    // 后期添加的元素不能在底下用平常函数的方法绑定事件，需要使用代理(事件委托)，即给原先就存在的父亲tbody绑定事件，然后代理到del身上
    $('#tb').empty().append(rows.join(''))
    $('#bc').empty().append(a.join(''))

    b.push('<tr><td>大物</td><td>' + Math.max.apply(null, Physics) + '</td><td>' + Math.min.apply(null, Physics) + '</td><td>' + avg.apply(null, Physics) + '</td><td>' + qualify.apply(null, Physics) + '</td></tr>')
    $('#bc').append(b.join(''))

    c.push('<tr><td>线代</td><td>' + Math.max.apply(null, Algebra) + '</td><td>' + Math.min.apply(null, Algebra) + '</td><td>' + avg.apply(null, Algebra) + '</td><td>' + qualify.apply(null, Algebra) + '</td></tr>')

    d.push('<tr><td>概率论</td><td>' + Math.max.apply(null, Statistics) + '</td><td>' + Math.min.apply(null, Statistics) + '</td><td>' + avg.apply(null, Statistics) + '</td><td>' + qualify.apply(null, Statistics) + '</td></tr>')

    $('#bc').append(c.join(''))
    $('#bc').append(d.join(''))
        // console.log(user.Mathematics)                            //undefind
}

function renderAvatar(user) {
    // 1. 获取用户的名称
    var name = user.username
    $('#userna').html('会员&nbsp;&nbsp;' + name)

}

function avg() {
    var sum = 0;
    for (var i = 0, j = arguments.length; i < j; i++) {
        sum += arguments[i];
    }
    return (sum / arguments.length).toFixed(2);
}

function qualify() {
    var qua = 0;
    len = arguments.length;
    for (var i = 0, j = arguments.length; i < j; i++) {
        if (arguments[i] >= 60) {
            qua++;
        }
    }
    return toPercent(qua / len);
}

function toPercent(a) {
    var str = Number(a * 100).toFixed(2);
    str += "%";
    return str;
}