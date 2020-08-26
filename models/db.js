const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const moment = require('moment');
const log = require("../utils/console");
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/database')[env]

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,// 指定连接的数据库类型
    pool: {
        max: 5,// 连接池中最大连接数量
        min: 0,// 连接池中最小连接数量
        idle: 10000// 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
    },
    timezone: '+08:00' //东八时区
})
// 数据库的状态
sequelize
    .authenticate()
    .then(() => {
        log("green", 'Connection has been established successfully!')
    })
    .catch(err => {
        log("red", 'Unable to connect to the database:')
        log("red", err)
    })

module.exports = {
    sync: () => {
        // only allow create ddl in non-production environment:
        if (process.env.NODE_ENV !== 'production') {
            return sequelize.sync({ force: false });//true强制同步
        } else {
            throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
        }
    },
    sequelize:sequelize,
    dataTypes:DataTypes,
    moment:moment,
}