const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.config.base.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
var DEFAULT_PORT = 8080;

function getPort() {
  portfinder.basePort = DEFAULT_PORT;
  portfinder.getPort(function(err, port) {
    if (!err) {
      DEFAULT_PORT = port;
    }
  });
}

async function mergeConfig() {
  await getPort();
  return merge(baseWebpackConfig, {
    devtool: 'cheap-eval-source-map',
    entry: {
      index: [ 'babel-polyfill', './front/entry.js' ],
    },
    output: {
      filename: 'js/[id].[hash:8].js', // 输出路径
      path: path.join( __dirname, '../dist' ),
      chunkFilename: 'js/[id].[hash:8].js',
      publicPath: '/'
    },
    module: {
      rules: [
        // {
        //   enforce: 'pre',
        //   test: /\.js$/,
        //   exclude: '/node_modules/',
        //   use: [
        //     {
        //       loader: 'eslint-loader',
        //       options: {
        //         emitError: true,
        //         fix: true
        //       },
        //     }
        //   ]
        // },
        {
          test: /\.(jpg|png|gif|swf)$/i,
          include: path.join(__dirname, '../front'),
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1000
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },
        {
          test: /\.less$/,
          use: [ 'style-loader', 'css-loader', 'less-loader' ]
        },
        {
          test: /\.js$/,
          include: path.join(__dirname, '../front'),
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true
              }
            }
          ]
        }
      ]
    },
    devServer: {
      contentBase: './dist',
      hot: true,
      noInfo: false,
      quiet: true,
      // compress: true,
      // stats: {
      //   assets: false,   // 增加资源信息
      //   chunks: false,  // 增加包信息（设置为 `false` 能允许较少的冗长输出）
      //   chunkModules: false,  // 将内置模块信息增加到包信息
      //   chunkOrigins: false,  // 增加包 和 包合并 的来源信息
      //   colors: true,   // 等同于`webpack --colors`
      //   errors: true,   // 增加错误信息
      //   modules: false,   // 增加内置的模块信息
      //   version: false,   // 增加 webpack 版本信息
      //   warnings: true,  // 增加提示
      // },
      proxy: {
        '/api/*': {
          target: 'http://localhost:7001',
          changeOrigin: true,
          secure: false
        }
      },
      historyApiFallback: true
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      }),
      new CopyWebpackPlugin([
        { from: './front/assets/**/*', to: './', flatten: true },
        // { from: './src/flexpaper', to: './js/flexpaper' },
      ]),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        isDev: 'true',
        favicon: './front/assets/favicon.ico', // favicon路径
        alwaysWriteToDisk: true,
        filename: './index.html',
        template: './front/assets/index.html',
        chunks: [ 'manifest', 'vendor', 'index' ]
      } ),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [ `Your application is running here: \u001b[1m\u001b[34mhttp://localhost:${DEFAULT_PORT}\u001b[39m\u001b[22m` ],
        },
        // clearConsole: true,
      }),
      new webpack.DllReferencePlugin( {
        context: __dirname,
        /**
         * 在这里引入 manifest 文件
         */
        manifest: require('../dist/vendor-manifest.json')
      })
    ]
  });
}


const config = mergeConfig();



module.exports = config;
