const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.config.base.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = merge(baseWebpackConfig, {
  devtool: 'source-map',
  entry: {
    index: [ 'babel-polyfill', './front/entry.js' ],
    vendor: [
      'antd',
      'axios',
      'history',
      'react-router',
      'react',
      'react-dom',
      'react-redux',
      'react-router-dom',
      'react-router-redux',
      'moment'
    ],
  },
  output: {
    filename: '[name].[chunkhash:8].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: './'
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
        test: /\.(jpg|png|gif)$/i,
        include: path.join(__dirname, '../front'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: 'imgs/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(css)$/,
        exclude: '/node_modules/',
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 'css-loader' ]
        }),
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
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([ 'dist' ], {
      root: path.join(__dirname, '../')
    }),
    new CopyWebpackPlugin([
      { from: './front/assets/index.html', to: './' },
      { from: './front/assets/favicon.ico', to: './' },
      // { from: './front/assets/pop.js', to: './' },
      { from: './front/assets/imags/*', to: './imgs' },
      // { from: './src/flexpaper', to: './js/flexpaper' },
    ]),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 6
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: [ 'manifest', 'vendor' ].reverse(),
      minChunks: 2
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        drop_debugger: true
      },
      comments: false
    }),
    new HtmlWebpackPlugin({
      isDev: 'false',
      favicon: './front/assets/favicon.ico', // favicon路径
      alwaysWriteToDisk: true,
      filename: './index.html',
      template: './front/assets/index.html',
      chunks: [ 'manifest', 'vendor', 'index' ],
      // chunks: [ 'index' ],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});
