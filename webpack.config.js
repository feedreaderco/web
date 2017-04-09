var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    main: './src/main.js',
    userpage: './src/userpage.js',
    login: './src/login.js',
    signup: './src/signup.js',
    bookmarklet: './src/bookmarklet.js',
    article: './src/article.js'
  },
  output: {
    path: path.join(__dirname, 'static'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
    ]
  }
};
