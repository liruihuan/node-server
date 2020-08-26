
const { sequelize, dataTypes, moment } = require('../db');


module.exports = sequelize.define('user', {
    passwd: dataTypes.STRING(100),
    name: dataTypes.STRING(100),
    // createdAt : {
    //     type: dataTypes.STRING,
    //     allowNull: false //是否允许为空true,false
    // },
    // updatedAt : {
    //     type: dataTypes.STRING,
    //     allowNull: false
    // },
    
}, {
    tableName: 'user',
    createdAt: "created_time",
    updatedAt: "updated_time",
    // timestamps: false,
    // hooks: {
        // beforeValidate: (obj) => {
            // console.log(obj)
            // let now = Date.now();
            // if (obj.isNewRecord) {
            //     obj.createdAt = moment(now).format('YYYY-MM-DD HH:mm:ss');
            //     obj.updatedAt = moment(now).format('YYYY-MM-DD HH:mm:ss');
            // } else {
            //     obj.updatedAt = moment(now).format('YYYY-MM-DD HH:mm:ss');

            // }
        // }
    // }

})