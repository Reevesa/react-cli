
const { common } = require('../config/statusCode');
const { genToken } = require('../middleware/authControl');
const userService = require('../services/user');

var user = {
  register: async function (ctx, next) {
    let userInfo = ctx.request.body;
    let data = await userService.register(userInfo);

    if (data) {
      ctx.body = Object.assign({ data }, common.success);
    } else {
      ctx.body = Object.assign({ data: null }, common.error);
    }
  },
  login: async function (ctx, next) {
    let userInfo = ctx.request.body;
    let res = await userService.login(userInfo);

    if (res && res.data) {
      let tokenInfo = {
        username: res.data.username,
        uid: res.data.uid
      };

      let token = genToken(tokenInfo);
      ctx.cookies.set('token', token);
      ctx.body = res;
    } else {
      ctx.body = res;
      console.log('err');
    }
  }
};

module.exports = user;