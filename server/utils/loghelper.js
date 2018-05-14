import { logConfig } from '../config';
import log4js from 'log4js';

log4js.configure(logConfig);

let loggersMap = {};
const CATEGORY = 'category';
const APPENDER = 'appenders';

function isEmptyObject(o) {
  for (let k in o) return false;

  return true;
}

if (isEmptyObject(loggersMap)) {
  logConfig && logConfig[APPENDER].forEach(function(appender) {
    if (appender.hasOwnProperty(CATEGORY)) {
      loggersMap[appender[CATEGORY]] = log4js.getLogger(appender[CATEGORY]);
    }
  });
}

export default function(category) {
  if (!category || category.trim() === '') {
    let stack = new Error().stack;

    let callLocation = stack.split('at')[2].split('/')[stack.split('at')[2].split('/').length - 1].replace(/\)/g, '');
    console.error(`Missing loghelper init params: category, at: ${callLocation}`);
    loggersMap['server'] && loggersMap['server'].error(new Error('Missing loghelper init params: category'));
  }

  if (!loggersMap.hasOwnProperty(category)) {
    console.error(`Can't find logger instance: ${category}`);
    loggersMap['server'] && loggersMap['server'].error(new Error(`Can't find logger instance: ${category}`));
  }

  return loggersMap[category];
}