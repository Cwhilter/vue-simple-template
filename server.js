var http = require('http');
var koa = require('koa');
var serve = require('koa-static');
var path=require('path')
var app = new koa();
var debug = process.env.NODE_ENV !== 'production';
// 开发环境和生产环境对应不同的目录
var viewDir = debug ? 'src' : 'dist';
var webpackDevMiddleware = require('koa-webpack-dev-middleware');
var webpack = require('webpack');
var webpackConf = require('./webpack.config');

app.use(webpackDevMiddleware(webpack(webpackConf), {
    contentBase: webpackConf.output.path,
    publicPath: webpackConf.output.publicPath,
    hot: true,
    stats: {
    	colors: true,
    	chunks: false
  	}
}));
// 处理静态资源和入口文件
app.use(serve(path.resolve(__dirname, viewDir), {
    maxage: 0
}));

app = http.createServer(app.callback());

app.listen(8000, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:8000' + '\n')
})
