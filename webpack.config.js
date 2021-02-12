const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    path.resolve('static_src/index.jsx'),
  ],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'static/build'),
    publicPath: '/static/build',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        // Don't use .babelrc in `yarn link`-ed dependency's directory and use in current direction instead
        loader: 'babel-loader?babelrc=false&extends=' + path.resolve(__dirname, '.babelrc')
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolveLoader: {
    modules: [
      'node_modules',
    ],
  },
}
