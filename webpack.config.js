const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: '/src/js/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js'
  },
  devServer: {
    port: 3000,
    static: {
      directory: path.resolve(__dirname, "./dist"),
    }
  },
  resolve: {
    modules: [path.resolve(__dirname, "src", "js"), "node_modules"],
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({cleanAfterEveryBuildPatterns: ['dist']}),
    new HtmlWebpackPlugin({template: path.resolve(__dirname, "src", "html", "index.html")})
  ]
};