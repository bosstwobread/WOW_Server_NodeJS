$(function (w) {
    $("#submit").click(function () {
        var name = $("#name").val();
        if (iChina(name)) {
            alert("用户名不能是中文");
            return;
        }
        if (name.length > 32) {
            alert("用户名长度不能超过32个");
            return;
        }
        var pwd = $("#pwd").val();
        var pwd_verfify = $("#pwd_verfify").val();
        if ($.trim(name) == "") {
            alert("用户名不能为空");
            return;
        }
        if ($.trim(pwd) == "") {
            alert("密码不能为空");
            return;
        }
        if (pwd == pwd_verfify) {
            //通过验证
            $.post("/register/addUser", { name: name, pwd: pwd }, function (result) {
                if (result.iSuccess !== false) {
                    alert("注册成功");
                    $("#name").val("");
                    $("#pwd").val("");
                    $("#pwd_verfify").val("");
                }
                else {
                    alert(result.msg);
                }
            });
        }
        else {
            alert("密码两次输入不一致");
        }
    })
    function iChina(str) {
        if (/.*[\u4e00-\u9fa5]+.*/.test(str)) {
            return true;
        } else {
            return false;
        }
    }
})
