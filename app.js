const koa = require("koa");
const app = new koa();
const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')
const Router = require('./router');
const moment = require("moment");
const log = require("./utils/console");

app.use(require('koa-static')(__dirname + '/public'))
app.use(bodyparser())
app.use(logger((str => {
    log("yellow",moment().format('YYYY-MM-DD HH:mm:ss') + str);
})))


// routes
app.use(Router());




module.exports = app
