var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    main: './main.js',
    userpage: './userpage.js',
    login: './login.js',
    signup: './signup.js',
    bookmarklet: './bookmarklet.js'
  },
  output: {
    path: path.join(__dirname, 'static'),
    filename: '[name].js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
};
