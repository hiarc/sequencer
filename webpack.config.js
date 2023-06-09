const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: '/src/typescript/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js'
  },
  devServer: {
    port: 3000,
    static: {
      directory: path.resolve(__dirname, './dist'),
    }
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src', 'typescript'),
      'node_modules'
    ],
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader']},
      { mimetype: 'image/svg+xml', scheme: 'data', type: 'asset/resource', 
        generator: { filename: 'icons/[hash].svg'}
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin({cleanAfterEveryBuildPatterns: ['dist']}),
    new HtmlWebpackPlugin({template: path.resolve(__dirname, 'src', 'html', 'index.html')})
  ]
};