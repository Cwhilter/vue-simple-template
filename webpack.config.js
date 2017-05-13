var path = require('path')
var webpack = require('webpack')
//提取css
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CleanPlugin = require('clean-webpack-plugin')//webpack插件，用于清除目录文件 
var HtmlWebpackPlugin = require('html-webpack-plugin')//动态插入js和css文件
var debug = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('./dist'),
    publicPath: debug?'/dist/':'/',
    chunkFilename: debug ? '[id].js' : 'js/[id].js',
    filename: debug?'index.js':'js/index.js'
  },
  module: {
    rules: [
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
      
      /*{
        test: /.css$/,
        use:[{
            loader: "style-loader" // creates style nodes from JS strings 
        }, {
            loader: "css-loader" // translates CSS into CommonJS 
        }]
      },*/
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
        test: /\.((ttf|eot|woff|svg)(\?t=[0-9]\.[0-9]\.[0-9]))|(ttf|eot|woff|svg)\??.*$/,
        loader: 'url-loader',
        query:{
          name:'fonts/[name].[ext]'
        }
      },
      {
          //test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
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
      'vux-components': 'vux/src/components'
    }
  },
  //各种插件，参考官网https://webpack.js.org/
  plugins: [
      new webpack.ProvidePlugin({// 全局依赖jQuery,不需要import了
        $ : "jquery",
        jQuery : "jquery",
        "window.jQuery" : "jquery"
      })
  ],
  //选择定义开发模式下的各种环境属性，具体参考https://webpack.js.org/configuration/dev-server/
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
if(process.env.NODE_ENV==='development'){
  module.exports.module.rules.push({
        test: /.css$/,
        use:[{
            loader: "style-loader" // creates style nodes from JS strings 
        }, {
            loader: "css-loader" // translates CSS into CommonJS 
        }]
      });
}
if (process.env.NODE_ENV === 'production') {
  //开发模式下可选择生成source-map来调试程序--记得将uglifyJsPlugin中的sourceMap设置为true
  //source-map有多种模式，具体可参考http://www.sourcemap.com/
  //module.exports.devtool = '#source-map'
  module.exports.module.rules.push({
        test: /.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
          publicPath: "/dist/"
        })
      });
  module.exports.module.rules[0].options.loaders={css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
            })
            }
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new CleanPlugin(['./dist/**/*']), //清空生成目录
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin("css/[name].css"),   
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',//模板路径
      inject: true,
      hash:true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}

