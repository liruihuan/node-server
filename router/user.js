const Router = require('koa-router')
const UsersController = require('../controllers/user')

const router = new Router({
    prefix: '/api/v1' // 设置公共前缀
})

router.post('/add', UsersController.add)
router.get('/find', UsersController.find)
router.post('/update', UsersController.update)
router.post('/del', UsersController.del)

module.exports = router