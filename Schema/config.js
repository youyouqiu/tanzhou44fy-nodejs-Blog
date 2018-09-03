// 链接数据库 导出 db Schema
const mongoose = require("mongoose");
const db = mongoose.createConnection("mongodb://localhost:27017/blogproject", {useNewUrlParser: true});

// 用原生es6的promise代替mongoose自实现的promise
mongoose.Promise = global.Promise;

// 取出mongoose的Schema
const Schema = mongoose.Schema;

db.on("error", () => {
    console.log("连接数据库失败，请重新检查设置");
});

db.on("open", () => {
    console.log("blogproject 数据库连接成功");
});





module.exports = {
    db,
    Schema
}



