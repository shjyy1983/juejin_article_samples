'use strict'

const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, 'app.js')
  },
  output: {
    filename: 'app.js',
    publicPath: ''
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@views': path.resolve(__dirname, './src/views'),
      '@net': path.resolve(__dirname, './src/net')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // 小于10K的图片转成base64编码的dataURL字符串写到代码中
          name: 'images/[name].[ext]' // 其他的图片转移到静态资源文件夹，hash:7 代表 7 位数的 hash
        }
      }
    ]
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: '127.0.0.1',
    port: '9000'
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.ejs'),
      filename: 'index.html',
      inject: false
    })
  ]
}
