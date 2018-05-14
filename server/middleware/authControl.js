import jwt from 'jsonwebtoken';
import loghelper from '../utils/loghelper';
import common from '../utils/common';

const logger = loghelper('server');

const expiredTime = 60 * 30;
const sKeys = 'test_keys';

function genToken(data) {
  var token = jwt.sign(data, sKeys, { expiresIn: expiredTime });
  return token;
}

function handleTokenError(ctx, msg) {
  ctx.cookies.set('token', '');

  switch (msg) {
    case 'jwt expired':
      ctx.body = Object.assign({ data: null }, common.notLogin);
      break;
    case 'invalid token':
      ctx.body = Object.assign({ data: null }, common.invalidToken);
      break;
    case 'jwt malformed':
      console.log('--jwt malformed---');
      ctx.body = Object.assign({ data: null }, common.errorToken);
      break;
    default:
      console.log('token invalid');
      ctx.body = Object.assign({ data: null }, common.errorToken);
  }
}

async function authVerify(ctx, next) {
  const token = ctx.cookies.get('token');

  if (!token) {
    ctx.body = Object.assign({ data: null }, common.notLogin);
    return;
  }

  try {
    let tokenContent = await jwt.verify(token, sKeys);
    console.log('---verify-token--', tokenContent);
    // if (tokenContent.userId) {
    await next();
    // }
  } catch (err) {
    logger.error('verify token error: ', err);
    console.log('err :', err);
    if (err && err.message) {
      handleTokenError(ctx, err.message);
    } else {
      ctx.body = Object.assign({ data: null }, common.error);
    }
  }
}

async function refreshToken(ctx, next) {
  var token = ctx.cookies.get('token');

  if (token) {
    try {
      let tokenContent = await jwt.verify(token, sKeys);

      delete tokenContent.iat; // 过期时间
      delete tokenContent.exp;

      let newToken = jwt.sign(tokenContent, sKeys, { expiresIn: expiredTime });
      ctx.cookies.set('token', newToken);

      await next();
    } catch (err) {
      logger.error('---refreshToken: ', err);
      if (err && err.message) {
        handleTokenError(ctx, err.message);
      } else {
        ctx.body = Object.assign({ data: null }, common.notLogin);
      }
    }
  } else {
    ctx.body = Object.assign({ data: null }, common.notLogin);
    return;
  }
}

module.exports = {
  genToken,
  refreshToken,
  authVerify
};