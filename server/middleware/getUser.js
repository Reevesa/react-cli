// const { config } = require('../config');
const jwt = require('jsonwebtoken');
const sKeys = 'test_keys';

var info = {
  userInfo: async function (ctx) {
    var token = ctx.cookies.get('token');
    if (token) {
      let tokenContent = await jwt.verify(token, sKeys);
      return tokenContent;
    } else {
      return null;
    }
  }
};

export default info;
