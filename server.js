var http = require('http');
var express=require('express');
var path=require('path')
var app = express();
var debug = process.env.NODE_ENV !== 'production';
var opn = require('opn');
var webpack = require('webpack');
var webpackConf = require('./build/webpack.dev.conf');
var history=require('connect-history-api-fallback');//单页面情况下路由重定向
// 使用 Mock
var Mock = require('mockjs')
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


var data=Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'result|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
})

app.use(require("webpack-hot-middleware")(compiler));
app.use(express.static('dist'));



var proxy = require('http-proxy-middleware');
console.log(proxy)
// proxy middleware options 
var options = {
        target: 'http://localhost:8001', // target host 
        changeOrigin: true,               // needed for virtual hosted sites 
        ws: true,                         // proxy websockets 
        pathRewrite: {
            '^/api/old-path' : '/api/new-path',     // rewrite path 
            '^/api/remove/path' : '/path'           // remove base path 
        },
        // router: {
        //     // when request.headers.host == 'dev.localhost:3000', 
        //     // override target 'http://www.example.org' to 'http://localhost:8000' 
        //     'localhost:8000' : 'http://localhost:8001'
        // }
    };
 
// create the proxy (without context) 
//var exampleProxy = proxy(options);
//请求代理
// app.use('/hsc',proxy(options));


//模拟测试数据
app.post('/menu', function(req, res) {
    var menu_list = [{
        icon: 'icon-dropdown',
        menu_name: 'vm_manage'
    }];
    var res_data = {
        success: true,
        result: menu_list
    };
    res.send(JSON.stringify(res_data));
  });
app.get('/user', (req,res) => {
    var user = {
        username: 'wp',
        password: '123456'
    }
    res.send(JSON.stringify(user));
})
// mount `exampleProxy` in web server 
app.listen(8000, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:8000' + '\n')
  opn('http://localhost:8000');
})
