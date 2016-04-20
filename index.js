var path = require('path');
var glob = require('glob');
var webpack = require('webpack');

var rootPath = path.resolve(__dirname, '../..');

var uglifyOptions = {
  minimize: true,
  output: {comments: false},
  compressor: {warnings: false}
};

var babelOptions = {
  test: /.js$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  query: {
    compact: true,
    presets: ['es2015']
  }
};

module.exports = {
  entry: getEntries(),
  output: {
    path: rootPath + '/public/js',
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('production')}}),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(uglifyOptions)
  ],
  module: {
    loaders: [babelOptions]
  }
};

function getEntries () {
  var files = glob.sync('./src/scripts/{*,bundles/*}.js');

  return files.reduce(function (entries, file) {
    var name = path.basename(file, '.js');
    entries[name] = file;
    return entries;
  }, {});
}
