exports.register_bll = function () {
    this.mysql = require('mysql');

    //新增账号数据，需要监测是否重复
    this.addUser = function (user_name, pwd, callback) {
        var selectSQL = "select count(1) count from account where username=?";
        var selectParams = [user_name];
        execSQL.call(this, selectSQL, selectParams, function (rows) {
            if (rows.iSuccess === false) {
                callback(rows);
                return;
            }
            if (rows && rows[0].count == 0) {
                var insertSQL = "INSERT INTO user_temp(username,pwd) VALUES(?,?)";
                var insertParams = [user_name, pwd];
                execSQL.call(this, insertSQL, insertParams, callback);
            }
            else {
                callback({ iSuccess: false, msg: "用户已存在，请更换用户名" });
            }
        });
    }

    //修改密码
    this.getSolutionCount = function (callback) {
        var selectSQL = "select max(s_index) count from solution";
        var selectParams = [];
        var solution_json = "";
        execSQL.call(this, selectSQL, selectParams, callback);
    }

    //SQL语句调用通用函数
    function execSQL(aSQL, aParams, callback) {
        this.getConn().query(aSQL, aParams, (err, rows) => {
            if (err) {
                // console.log('[SQL ERROR] - ', err.message);
                if (err.code == "ER_DUP_ENTRY") {
                    callback.call(this, { iSuccess: false, msg: "用户名已存在" });
                }
                else {
                    callback.call(this, { iSuccess: false, msg: "服务器维护中，请稍后重试" });
                }
                global.connection = null;
            } else {
                callback.call(this, rows);
            }
        })
    }

    //获取连接
    this.getConn = function () {
        if (!global.connection) {
            global.connection = this.mysql.createConnection(global.config.mysql);
            global.connection.on('error', function (err, z, x, c, v, b) {
                global.connection = null;
                console.log(err.code);
            });
        }
        return global.connection;
    }
}