var baseConf = require('./webpack.base.conf');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin')//动态插入js和css文件

Object.keys(baseConf.entry).forEach(function (name) {
    baseConf.entry[name] = ['./build/dev-client'].concat(baseConf.entry[name])
  })
module.exports = merge(baseConf, {
    module: {
        rules: [{
            test: /.css$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings 
            }, {
                loader: "css-loader" // translates CSS into CommonJS 
            }]
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
              loaders: {
                less: 'vue-style-loader!css-loader!less-loader'
              }/*,
              loaders: {
                less: 'less-loader'
              },*/
              // other vue-loader options go here
            }
          },
        ]
    },
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
})