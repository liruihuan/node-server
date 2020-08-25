const Sequelize = require('sequelize');
const uuid = require('node-uuid');
const moment = require('moment');
const log = require("../utils/console");
const env       = process.env.NODE_ENV || 'development'
const config    = require(__dirname + '/../config/database')[env]
function generateId() {
    return uuid.v4();
}
const sequelize = new Sequelize(config.database, config.username, config.password,  {
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
    log("green",'数据库连接成功!')
  })
  .catch(err => {
    log("red",'数据库连接失败!')
    log("red",err)
  })
  const ID_TYPE = Sequelize.STRING(50);
 function defineModel(name, attributes) {
    var attrs = {};
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }
    attrs.id = {
        type: ID_TYPE,
        primaryKey: true //对主键的设置, true,false
    };
    attrs.createdAt = {
        type: Sequelize.STRING,
        allowNull: false //是否允许为空true,false
    };
    attrs.updatedAt = {
        type: Sequelize.STRING,
        allowNull: false
    };

  
    console.log('model defined for table: ' + name + '\n' + JSON.stringify(attrs, function (k, v) {
        if (k === 'type') {
            for (let key in Sequelize) {
                if (key === 'ABSTRACT' || key === 'NUMBER') {
                    continue;
                }
                let dbType = Sequelize[key];
                if (typeof dbType === 'function') {
                    if (v instanceof dbType) {
                        if (v._length) {
                            return `${dbType.key}(${v._length})`;
                        }
                        return dbType.key;
                    }
                    if (v === dbType) {
                        return dbType.key;
                    }
                }
            }
        }
        return v;
    }, '  '));
    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate:  (obj)=> {
                let now = Date.now();
                if (obj.isNewRecord) {
                  
                    if (!obj.id) {
                        obj.id = generateId();
                    }
                    obj.createdAt = moment(now).format('YYYY-MM-DD HH:mm:ss');
                    obj.updatedAt = moment(now).format('YYYY-MM-DD HH:mm:ss');
 
                   
                } else {
                    obj.updatedAt =  moment(now).format('YYYY-MM-DD HH:mm:ss');
                   
                }
            }
        }
    });
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN',"DATE"];

var exp = {
    defineModel: defineModel,
    sync: () => {
        // only allow create ddl in non-production environment:
        if (process.env.NODE_ENV !== 'production') {
            return sequelize.sync({ force: false });//true强制同步
        } else {
            throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
        }
    }
};

for (let type of TYPES) {
    exp[type] = Sequelize[type];
}

exp.generateId = generateId;

module.exports = exp;