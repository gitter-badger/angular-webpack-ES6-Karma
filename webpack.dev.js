var webpack = require('webpack');
var path  =require('path');
var host = 'localhost';
var port = '3000';
module.exports = {
  context: __dirname,
  devtool: '#source-map',
  entry:[
    'webpack-dev-server/client?http://' + host + ':' + port,
    './src/app/app'
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/assets/',
    filename: 'main.js'
  },
  module: {
    loaders: [{
      test: /\.html$/,
      //loader: 'html?name=templates/[name]-[hash:6].html'
      loader: 'ngtemplate?relativeTo=' + path.resolve(__dirname, 'src', 'app') + '!html'
      //loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname, 'public')) + '/!html?name=templates/[name]-[hash:6].html'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'file?name=img/[name].[ext]' // inline base64 URLs for <=10kb images, direct URLs for the rest
    }, {
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.scss$/,
      loader: "style!css!autoprefixer!sass"
    }, {
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: "ng-annotate!babel?presets[]=es2015,presets[]=stage-1,plugins[]=transform-decorators-legacy"
    }, {
      test: [/fontawesome-webfont\.svg/, /fontawesome-webfont\.eot/, /fontawesome-webfont\.ttf/, /fontawesome-webfont\.woff/, /fontawesome-webfont\.woff2/],
      loader: 'file?name=fonts/[name].[ext]'
    }]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
