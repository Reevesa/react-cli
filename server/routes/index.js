const authVerify = require('../middleware/authControl');
const user = require('../controller/user');

function appRoutes(app, router) {
  app.use(router.routes()).use(router.allowedMethods());
  // home
  router.get('/login', authVerify, user.login);

}

module.exports = appRoutes;