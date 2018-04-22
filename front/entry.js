import React from 'react';
import { render } from 'react-dom';
import '@/less/index.less';
import App from './js/index.js';
// 日历控件改为中文模式
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

render(
  <App />,
  document.getElementById('app')
);