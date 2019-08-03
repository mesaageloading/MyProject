var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var mysql      = require('mysql');
var cookie = require('cookie');
var app = http.createServer(function(req,res){
    var url_obj = url.parse(req.url);
    //请求首页
    if(url_obj.pathname === '/'){
        render('./template/index.html',res);
        return;
    }
    //链接数据库

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database  :'ajaxdemo'
    });

    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        console.log('connected as id ' + connection.threadId);
    });

    //请求注册
    if(url_obj.pathname === '/register' && req.method === 'POST'){
        var user_info = '';
        req.on('data',function(chunk){
            user_info += chunk;
        });
        req.on('end',function(err){
            if(!err){
                console.log(user_info);
                var user_obj = querystring.parse(user_info);
                if(user_obj.username === '' || user_obj.password === ''){
                    res.write('{"status":0,"message":"密码不要空着"}','utf-8');
                    res.end();
                    return;
                }
                if(user_obj.password !== user_obj.repassword){
                    res.write('{"status":1,"message":"两次密码不一致"}','utf-8');
                    res.end();
                    return;
                }
                //把信息写入数据库
                var sql = "INSERT INTO admin(username,password) VALUE('"+user_obj.username+"','"+user_obj.password+"')";
                connection.query(sql,function(error,result){
                   if(!error && result && result !== 0){
                       res.write('{"status":2,"message":"注册成功"}','utf-8');
                       res.end();
                       return;
                   }
                })
            }
        });
        // console.log(url_obj);
        return;
    }

    //请求登录
    if(url_obj.pathname === '/login' && req.method ==='POST'){
        var login_obj = '';
        res.setHeader('content-type','text/html;charset=utf-8');
        req.on('data',function(chunk){
            login_obj += chunk;
        });
        req.on('end',function(err){
            if(!err){
                var login_str = querystring.parse(login_obj);
                var sql = "SELECT * FROM admin WHERE username='"+login_str.user"name+"' AND password='+login_str.password+"'";
                console.log(sql);
                connection.query(sql,function(error,result) {

                    if (!error && result && result.length !== 0) {
                        // console.log(result);
                        //设置cookie
                        res.setHeader('Set-Cookie',cookie.serialize('isLogin','true'));
                        res.write('{"status":3,"message":"登录成功"}', 'utf-8');
                        res.end();
                        return;
                    } else {
                        res.write('{"status":4,"message":"帐号/密码错误"}', 'utf-8');
                        res.end();
                        return;
                    }
                })
            }
        });
    }
    //返回表格信息
    if(url_obj.pathname === '/list' && req.method === 'GET'){
        var sql = 'SELECT * FROM user';
        connection.query(sql,function(error,result){
            var resultstr = JSON.stringify(result);
            // console.log(result);

            if(!error && result){
                res.setHeader('content-type','text/html;charset=utf-8');
                res.write('{"status":0,"data":'+resultstr+'}');
                res.end();
            }
        });
        return;
    }
    //添加用户信息
    if(url_obj.pathname === '/adduser' && req.method ==='POST'){
        var addUser_obj = '';
        req.on('data',function(chunk){
            addUser_obj += chunk;
        });
        req.on('end',function(err){
            if(!err){
                console.log(addUser_obj);
                var addUser_str = querystring.parse(addUser_obj);
                var sql = "INSERT INTO user(username,email,phone,qq) VALUE('"+addUser_str.username+"','"+addUser_str.email+"','"+addUser_str.phone+"','"+addUser_str.qq+"')";
                connection.query(sql,function(error,result){
                    if(!error && result && result.length !== 0){
                        // console.log(result);
                        res.write('{"status":0,"message":"登记成功"}','utf-8');
                        res.end();
                    }else{
                        res.write('{"status":1,"message":"登记失败"}','utf-8');
                        res.end();
                    }
                    return;
                });
            }
        })
        return;
    }
    //修改用户信息
    if(url_obj.pathname === '/change'&& req.method ==='POST'){
        var change_str = '';
        res.setHeader('content-type','text/html;charset=utf-8');


        req.on('data',function(chunk){
            change_str += chunk;
        });
        req.on('end',function(err){
            if(!err){
                var user_obj = querystring.parse(change_str);
                console.log(user_obj);
                var sql = "UPDATE user SET username='"+user_obj.username+"',email='"+user_obj.email+"',phone='"+user_obj.phone+"',qq='"+user_obj.qq+"' WHERE id = "+user_obj.id;
                connection.query(sql,function(error,result){
                    if(!error && result && result.length !== 0){
                        res.write('{"status":0,"message":"保存成功"}');
                        res.end();
                        return;
                    }
                })
            }
        })
    }
    //删除用户信息
    if(url_obj.pathname === '/delete'&& req.method ==='POST'){
        var delete_str = '';
        res.setHeader('content-type','text/html;charset=utf-8');
        req.on('data',function(chunk){
            delete_str += chunk;
        });
        req.on('end',function(err){
            if(!err){
                var delete_obj = querystring.parse(delete_str);
                var sql = 'DELETE FROM user WHERE id='+delete_obj.id;
                console.log(sql);
                connection.query(sql,function(error,result){
                    if(!error && result && result.length !== 0){
                        res.write('{"status":1,"message":"删除成功"}');
                        res.end();
                        return;
                    }
                })

            }
        })
    }
    //设置cookie
    if(url_obj.pathname === '/admin.html'){
        console.log(cookie.parse(req.headers.cookie || ''));
        if(cookie.parse(req.headers.cookie || '').isLogin === 'true'){
            render('./template/admin.html',res);
        }else{
            render('./template/error.html',res);
        }
        return;
    }
    //退出系统
    if(url_obj.pathname === '/logout'){

        res.setHeader('Set-Cookie',cookie.serialize('isLogin',''));
        render('./template/index.html',res);
        return;

    }
    render('./template'+url_obj.pathname,res);

});
app.listen(3000);
function render(path,res){
    //binary 二进制
    fs.readFile(path,'binary',function(err,data){
        if(!err){
            res.write(data,'binary');
            res.end();
        }
    })
}

function linkSQL(sqlObj){
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database  :'ajaxdemo'
    });

    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        console.log('connected as id ' + connection.threadId);
    });

    connection.query(sqlObj, function (error, result) {
        console.log(result);
    });
}
