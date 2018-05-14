
const { common } = require('../utils/statusCode');

const logHelper = require('../utils/loghelper');
const logger = loghelper('server');
let resMap = {};
let resArr = [];

let userService = {
  register: async function (userInfo) {
    try {
      let { username, pwd } = userInfo;

      let res = new Promise((resolve, reject) => {
        setTimeout(() => { resolve({ data: { username, pwd } }); }, 0);
      });

      return res;

    } catch (err) {
      logger.error(' register db error', err);
    }
  },
  login: async function (userInfo) {
    try {
      let { username, pwd } = userInfo;

      // 
      return userInfo;
    } catch (err) {
      logger.error('login db error', err);
    }
  }
};