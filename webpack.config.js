const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: '/src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'sequencer.js'
  },
  devServer: {
    port: 3000,
    static: {
        directory: path.resolve(__dirname, "./dist"),
    }
  },
  resolve: {
    modules: [path.resolve(__dirname, "src", "js"), "node_modules"],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: path.resolve(__dirname, "src", "html", "index.html")})
  ]
};