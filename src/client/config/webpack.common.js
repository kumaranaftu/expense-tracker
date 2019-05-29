const path = require("path")
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const WebpackMd5Hash = require("webpack-md5-hash");

const outputDirectory = '../../../dist';

module.exports = {
  entry: {
    main : './src/client/index.js'
  },
  output: {
    path: path.resolve(__dirname, outputDirectory),
    filename: '[name].[hash].bundle.js'    
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'My Expense Tracker',
      inject: false,
      hash: true,
      template: './public/index.html',
      favicon: './public/favicon.ico'
    })
  ]
}