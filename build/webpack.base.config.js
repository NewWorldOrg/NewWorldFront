'use strict'

const path = require('path')
const rm = require('rimraf')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/* delete files */
rm.sync(path.join(__dirname, '..', 'prod'))
rm.sync(path.join(__dirname, '..', 'dist'))

module.exports = {
  output: {
    path: path.join(__dirname, '..', 'dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: [/\.ts$/, /\.tsx$/],
        include: path.resolve('src'),
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: require('os').cpus().length - 1
            }
          },
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true
            }
          },
        ]
      },
      {
        test: [/\.js$/, /\.jsx$/],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          }
        }
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      inject: true
    }),
  ]
}
