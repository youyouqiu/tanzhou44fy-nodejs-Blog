// 连接 mongodb数据库

// 连接数据库 导出 db Schema
const mongoose = require("mongoose");
const db = mongoose.createConnection("mongodb://localhost:27017/blog-project", {useNewUrlParser: true});

// 用原生 es6 的 promise 代替 mongoose 自实现的 promise
mongoose.Promise = global.Promise;

// 取出 mongoose 的 Schema
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



