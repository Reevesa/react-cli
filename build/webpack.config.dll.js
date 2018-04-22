const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  resolve: {
    extensions: [ '.js', '.jsx' ]
  },
  entry: {
    vendor: [
      'antd', 'react', 'react-dom', 'react-router-redux',
      'react-router-dom', 'lazy-route', 'react-redux',
      'react-router', 'redux', 'redux-thunk', 'moment',
      'axios', 'history', 'underscore', 'less', 'prop-types'
    ]
  },
  output: {
    filename: '[name].dll.js', // best use [hash] here too
    path: path.join(__dirname, '..', 'dist'),
    library: 'vendor_lib_[hash]',
  },
  plugins: [
    new CleanWebpackPlugin([ 'dist' ], {
      root: path.join(__dirname, '../')
    }),
    new CopyWebpackPlugin([
      // { from: './static/**/*', to: './' , flatten: true},      // flatten 不要文件夹层
      // { from: './src/flexpaper', to: './js/flexpaper' },
    ]),
    new webpack.DllPlugin({
      context: __dirname,
      /**
       * path
       * 定义 manifest 文件生成的位置
       * [name]的部分由entry的名字替换
       */
      path: path.join(__dirname, '..', 'dist', 'vendor-manifest.json'),
      /**
       * name
       * dll bundle 输出到那个全局变量上
       * 和 output.library 一样即可。
       */
      name: 'vendor_lib_[hash]',
    })
  ],
};

