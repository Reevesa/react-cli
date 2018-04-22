
const path = require('path');
const webpack = require('webpack');
const baseConfig = {
  // context: path.resolve(__dirname, "../"),
  resolve: {
    // root:
    extensions: [ '.js', '.json', '.css', '.less' ],
    modules: [
      path.resolve(__dirname, '../node_modules'),
      path.join(__dirname, '../front')
    ],
    alias: {
      '@': path.join(__dirname, '../front/assets'),
      'actions': path.join(__dirname, '../front/store/actions'),
      'modules': path.join(__dirname, '../front/routes/modules'),
      'pages': path.join(__dirname, '../front/routes/pages')
    }
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),   // 作用域提升(scope hoisting)
  ],
};

module.exports = baseConfig;
