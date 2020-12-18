'use strict'

const baseConfig = require('./webpack.base.config.js')
const { merge } = require('webpack-merge')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
         ],
        },
        {
          test: /\.styl(us)?$/,
           use: [
             'style-loader',
             'css-loader',
             'postcss-loader',
             'stylus-loader'
           ]
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader?modules',
            'postcss-loader',
            'sass-loader'
          ]
        }
      ]
    }
})
