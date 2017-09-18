var path = require('path')
var webpack = require('webpack')
//提取css
var debug = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    main:'./src/index.js',
    vue:'vue',
    jquery:'jquery'
    
  },
  output: {
    path: path.resolve('./dist'),
    publicPath: '/',
    chunkFilename: 'js/[name].js',
    filename: debug?'js/[name].js':'js/[name].[chunkhash:7].js',
  },
  module: {
    rules: [
      
      {
        test: /\.less$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings 
        }, {
            loader: "css-loader" // translates CSS into CommonJS 
        }, {
            loader: "less-loader" // compiles Less to CSS 
        }]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query:{
          limit:10000,
          name:path.posix.join('fonts/', '[name].[ext]')
        }
      },
      {
         // test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
          test: /\.(png|jpe?g|gif)(\?.*)?$/,
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: path.posix.join('images/', '[name][hash:7].[ext]')
          }
      }
      
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'layouts': path.resolve(__dirname,'../src/layouts'),
      //'vux-components': 'vux/src/components'
    }
  },
  //各种插件，参考官网https://webpack.js.org/
  plugins: [
      new webpack.ProvidePlugin({// 全局依赖jQuery,不需要import了
        $ : "jquery",
        jQuery : "jquery",
        "window.jQuery" : "jquery"
      }),
      new webpack.optimize.CommonsChunkPlugin({
          name: ['vue','jquery'] // 指定公共 bundle 的名字。
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "manifest",
        minChunks: Infinity
      }),
  ],
  //选择定义webpack-dev-server开发模式下的各种环境属性，具体参考https://webpack.js.org/configuration/dev-server/
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    port:8081
  },
  performance: {  
    hints: false
  },
  //devtool: '#eval-source-map'
}

