
const DB = require("../models")
const UsersController = {
  add: async (ctx) => {
    const data = ctx.request.body
    await DB.user.findOne({ where: { name: data.name } }).then(async (res) => {
      if (res === null) {
        // ctx.response.body = ''
        await DB.user.create({
          name: data.name,
          passwd: data.passwd
        }).then(() => {
          ctx.body = { code: 1, msg: "添加成功!" };
        }).catch((err) => {
          ctx.body = { code: 0, msg: "添加失败!" };
          console.log(err, "User creation failed")
        });
      } else {
        ctx.body = { code: 2, msg: "该用户已存在!" };
      }
    }).catch((err) => {
      console.log(err, "Find user failed from add")
    })

  },
  find: async (ctx) => {
    await DB.user.findAll().then(user => {
      ctx.body = { code: 1, msg: "查找成功!", list: user }
    }).catch(error => {
      ctx.body = { code: 0, msg: "查找失败!" }
      console.log(error, "Find user failed from find")
    })

  },
  del: async (ctx) => {
    const data = ctx.request.body
    const delUser = await DB.user.destroy({ where: { id: data.id } })
    ctx.body = delUser ? { code: 1, msg: "删除成功!" } : delUser === 0 ? { code: 2, msg: "用户不存在!" } : { code: 0, msg: "删除失败!" };
  },
  update: async (ctx) => {
    const data = ctx.request.body
    await DB.user.update({ name: data.name, passwd: data.passwd }, {
      where: {
        id: data.id
      }
    }).then((res) => {
      ctx.body = res[0] ? { code: 1, msg: "更新成功!" } : { code: 2, msg: "用户不存在!" };
    }).catch(error => {
      ctx.body = { code: 0, msg: "更新失败!" }
      console.log(error, "update user failed")
    });

  },

}
module.exports = UsersController