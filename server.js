var http = require('http');
var express=require('express');
var path=require('path')
var app = express();
var debug = process.env.NODE_ENV !== 'production';
var opn = require('opn');
var webpack = require('webpack');
var webpackConf = require('./webpack.config');
var history=require('connect-history-api-fallback');
var compiler=webpack(webpackConf);

app.use(history());
// dev编译，产物存放在内存中
app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    stats: {
        colors: true,
        chunks: false
    },
    hot:true,
    historyApiFallback: true
})); 

// app.use(hotMiddleware);
app.use(require("webpack-hot-middleware")(compiler));
app.use(express.static('static'));
app.get('/student',function(req,res){
    res.send('hello.html')
})
app.listen(8000, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:8000' + '\n')
  opn('http://localhost:8000');
})