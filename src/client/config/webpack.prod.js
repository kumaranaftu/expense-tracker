const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js')
const WebpackMd5Hash = require("webpack-md5-hash");

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,               
            },
            'css-loader',
            'sass-loader',
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
    }),
    new WebpackMd5Hash()
  ]
})