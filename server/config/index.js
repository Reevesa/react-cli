const { resolve } = require('path');

export const logConfig = {
  appenders: [ {
    'type': 'dateFile',
    'filename': resolve(__dirname, '../../logs/server.log'),
    'pattern': '-yyyy-MM-dd.log',
    'category': 'server'
  }, {
    'type': 'dateFile',
    'filename': resolve(__dirname, '../../logs/mysql.log'),
    'pattern': '-yyyy-MM-dd.log',
    'category': 'mysql'
  } ]
};