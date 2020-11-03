const express = require('express')
const app = express()
const port = 3000
// 依赖mysql连接数据库请求所需要的数据
// 使用commonjs引入mysql进行使用
var mysql = require('mysql')
// 跨域处理
app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next()
})
// 连接数据库
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'topys'
})
connection.connect()

// 查询所有用户
app.get('/user', (req, res) => {
    if (req.query.username) {
        connection.query('select * from users where username='+req.query.username, function (err, result) {
            const obj={
                status:200,
                data:result
            }
            res.json(obj)
        })
    }else {
        connection.query('select * from users', function (err, result) {
            const obj={
                status:200,
                data:result
            }
            res.json(obj)
        })
    }
})
// 注册用户
app.get('/add', (req, res) => {
    connection.query(`insert into users(username,password,name) values ('${req.query.username}','${req.query.password}','${req.query.name}');`, function (err, result) {
        const obj={
            status:200,
            message:'注册成功！'
        }
        res.json(obj)
    })
})
// 查询登录用户密码
app.get('/unique', (req, res) => {
    connection.query('select password from users where username='+req.query.username, function (err, result) {
        const obj={
            status:200,
            data:result
        }
        res.json(obj)
    })
})
// 首页列表
app.get('/list', (req, res) => {
    let sql=''
    if (req.query.type) {
        // 首页获取作品列表
        sql=`select * from works where type='${req.query.type}'`
    }else {
        // 跳转作品详情
        sql=`select * from works where id='${req.query.id}'`
    }
    connection.query(sql, function (err, result) {
        const obj={
            status:200,
            data:result
        }
        res.json(obj)
    })
})
// 精选课程
app.get('/video1', (req, res) => {
    connection.query(`select * from videos where good='true';`, function (err, result) {
        const obj={
            status:200,
            data:result
        }
        res.json(obj)
    })
})
// 热门课程
app.get('/video', (req, res) => {
    connection.query(`select * from videos order by num desc limit 0,3;`, function (err, result) {
        const obj={
            status:200,
            data:result
        }
        res.json(obj)
    })
})
// 创意学院跳转详情
app.get('/detail1', (req, res) => {
    connection.query(`select * from videos where id='${req.query.id}'`, function (err, result) {
        const obj={
            status:200,
            data:result
        }
        res.json(obj)
    })
})
// 查询评论
app.get('/comment', (req, res) => {
    connection.query(`select * from comments where work_id='${req.query.id}'`, function (err, result) {
        const obj={
            status:200,
            data:result
        }
        res.json(obj)
    })
})
// 修改某一条评论赞的数量
app.get('/good', (req, res) => {
    connection.query(`update comments set num=${req.query.num} where id=${req.query.id}`, function (err, result) {
        let obj={};
        if (req.query.num==0) {
            obj={
                status:200,
                message:'您取消了赞！'
            }
        }else {
            obj={
                status:200,
                message:'您赞了这条评论！'
            }
        }
        res.json(obj)
    })
})
// 修改某个作品赞的数量
app.get('/good1', (req, res) => {
    connection.query(`update works set likes=${req.query.like} where id=${req.query.id}`, function (err, result) {
        let obj={};
        if (req.query.num==0) {
            obj={
                status:200,
                message:'您取消了赞！'
            }
        }else {
            obj={
                status:200,
                message:'您赞了这条评论！'
            }
        }
        res.json(obj)
    })
})
// 给某个作品添加评论
app.get('/addcomment', (req, res) => {
    connection.query(`insert into comments(url,title,date,content,num,work_id) values ('${req.query.url}','${req.query.title}','${req.query.date}','${req.query.content}',0,${req.query.workid});`, function (err, result) {
        const obj={
            status:200,
            message:'您发表了评论！'
        }
        res.json(obj)
    })
})
// 课程页面
app.get('/class', (req, res) => {
    let sql=''
    if (req.query.type=='全部') {
        sql='select * from videos;'
    }else if(req.query.type) {
        sql=`select * from videos where type='${req.query.type}'`
    }else {
        sql=`select * from videos where id='${req.query.id}'`
    }
    connection.query(sql, function (err, result) {
        const obj={
            status:200,
            data:result
        }
        res.json(obj)
    })
})
// 用户的创意库的添加
app.get('/library', (req, res) => {
    let sql=''
    if (req.query.desc) {
        console.log(1);
        console.log(req.query.username,req.query.name,req.query.desc,req.query.url);
        sql=`insert into library(username,name,desc,url) values ('${req.query.username}','${req.query.name}','desc','${req.query.url}');`
        console.log(sql);
    }else {
        console.log(0);
        sql=`insert into library(username,name,url) values ('${req.query.username}','${req.query.name}','${req.query.url}');`
    }
    connection.query(sql, function (err, result) {
        const obj={
            status:200,
            message:'您新建了一个创意库！'
        }
        res.json(obj)
    })
})
// 查询用户的创意库
app.get('/sellib',(req,res)=> {
    let sql=''
    if (req.query.username) {
        sql=`select * from library where username='${req.query.username}'`
    }else{
        sql=`select * from library where id=${req.query.id}`
    }
    connection.query(sql, function (err, result) {
        const obj={
            status:200,
            data:result
        }
        res.json(obj)
    })
})
// 在创意库里添加文章
app.get('/aart',(req,res)=> {
    connection.query(`update library set articles='${req.query.articles}' where id=${req.query.id}`, function (err, result) {
        const obj={
            status:200,
            message:'已收藏该文章！'
        }
        res.json(obj)
    })
})
// 删除创意库
app.get('/rbank',(req,res)=> {
    connection.query(`delete from library where id=${req.query.id}`, function (err, result) {
        const obj={
            status:200,
            message:'您已成功删除此创意库！'
        }
        res.json(obj)
    })
})
// 查询用户收藏的视频
app.get('/cvideos',(req,res)=> {
    connection.query(`select videos from c_videos where username=${req.query.username}`, function (err, result) {
        const obj={
            status:200,
            data:result
        }
        res.json(obj)
    })
})
// 收藏视频
app.get('/cvideos1',(req,res)=> {
    connection.query(`update c_videos set videos='${req.query.videos}' where username=${req.query.username}`, function (err, result) {
        const obj={
            status:200,
            message:'已收藏该视频！'
        }
        res.json(obj)
    })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))