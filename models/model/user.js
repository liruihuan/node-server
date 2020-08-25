
const db = require('../db');

module.exports = db.defineModel('user', {

    passwd: db.STRING(100),
    name: db.STRING(100),
   
});
