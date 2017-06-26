var http = require('http');
var express=require('express');
var path=require('path')
var app = express();
var debug = process.env.NODE_ENV !== 'production';
// 开发环境和生产环境对应不同的目录
var webpack = require('webpack');
var webpackConf = require('./webpack.config');
var history=require('connect-history-api-fallback');
var compiler=webpack(webpackConf);
// dev编译，产物存放在内存中
app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    stats: {
        colors: true,
        chunks: false
    },
    hot:true
})); 
var hotMiddleware = require('webpack-hot-middleware')(compiler)

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
});
app.use(hotMiddleware);
app.use(express.static('static'));
app.use(history())
app.listen(8000, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:8000' + '\n')
})