var express = require('express');
var fs = require("fs");
var router = express.Router();

/* 注册页面，邮箱/手机. */
router.get('/', function(req, res, next) {
    console.log('/tsest');
    res.render('index', { title: 'Express22' });
});
/* 注册成功页面. */

/* 密码修改页面. */

fs.readFile('config.json', 'utf8', function(err, data) {
    if (err) console.log(err);
    global.config = JSON.parse(data);

    /* 注册请求. */
    router.post('/register', function(req, res, next) {
        // bll.
    });

    /* 密码修改请求. */
    router.post('/register', function(req, res, next) {
        // bll.
    });
})

module.exports = router;