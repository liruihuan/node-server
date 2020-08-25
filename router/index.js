const fs = require('fs');
const path = require('path')
const compose = require('koa-compose')




router = () => {
    let routers = [];
    let files = fs.readdirSync(__dirname);

    let jsFiles = files.filter((file) => {
        return (file.indexOf('.') !== 0) &&
            (file !== "index.js") &&
            (file.slice(-3) === '.js')
    });
    for (let f of jsFiles) {
        let route = require(path.join(__dirname, f))
        routers.push(route.routes())
        routers.push(route.allowedMethods())

    }

    return compose(routers)
}



module.exports = router