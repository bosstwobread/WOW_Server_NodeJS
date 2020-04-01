var express = require('express');
var app = express();
var fs = require("fs");
var router = express.Router();
var register_bll_js = require('../BLL/register_bll.js');
var register_bll = new register_bll_js.register_bll();

router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
/* 注册页面，邮箱/手机. */
router.get('/', function (req, res, next) {
    var params = req.query;
    res.render('register', {});
});

/* 注册成功页面. */

/* 密码修改页面. */

/* 注册请求. */
router.post('/addUser', function (req, res, next) {
    var name = req.body.name;
    var pwd = req.body.pwd;
    register_bll.addUser(name, pwd, function (rows) {
        res.send(JSON.stringify(rows));
    });
});

/* 密码修改请求. */
router.post('/editPwd', function (req, res, next) {
    // bll.
});

module.exports = router;