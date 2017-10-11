let mysql = require('mysql');
let pool = global.pool;
if(!pool){
    pool = mysql.createPool({
        database : 'exam',
        user : 'root',
        password : 'root'
    });
    global.pool = pool;
}

//获取连接
function getConnection(){
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,connection){
            if(!err){
                resolve(connection);
            }else{
                reject(err);
            }
        });
    })
}

//执行sql
function execute(sql){
    return new Promise(function(resolve,reject){
        let connect;
        getConnection().then(function(connection){
            connect = connection;
            connect.query(sql,function(err,results){
                if(!err){
                    resolve(results);
                }else{
                    reject(err);
                }
            });
        }).catch(function(err){
            reject(err);
        }).finally(function(){
            if(connect){
                connect.release();
                console.log("释放完成");
            }
        });
    })
}

module.exports = {
    getConnection,
    execute
}
