var path = require('path')
var webpack = require('webpack')
//提取css
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CleanPlugin = require('clean-webpack-plugin')//webpack插件，用于清除目录文件 
var HtmlWebpackPlugin = require('html-webpack-plugin')//动态插入js和css文件
var merge = require('merge')
var debug = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('./dist'),
    publicPath: debug?'/dist/':'./',
    chunkFilename: debug ? '[chunkhash:8].chunk.js' : 'js/[chunkhash:8].chunk.min.js',
    filename: debug?'index.js':'js/[hash:8].[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            
          }
          // other vue-loader options go here
        }
      },
      {
        test: /.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
          publicPath: "/dist/css/"
        })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.((ttf|eot|woff|svg)(\?t=[0-9]\.[0-9]\.[0-9]))|(ttf|eot|woff|svg)\??.*$/,
        loader: 'url?limit=10000&name=fonts/[name].[ext]'
      },
      {
          //test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
          test: /\.(png|jpe?g|gif)(\?.*)?$/,
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: path.posix.join('images/', '[name].[hash:7].[ext]')
          }
      }
      
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  //devtool: '#eval-source-map'
}
if (process.env.NODE_ENV === 'production') {
  //开发模式下可选择生成source-map来调试程序--记得将uglifyJsPlugin中的sourceMap设置为true
  //source-map有多种模式，具体可参考http://www.sourcemap.com/
  //module.exports.devtool = '#source-map'
  module.exports.module.rules[0].options.loaders={css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
            })}
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
    new ExtractTextPlugin("css/style.[hash:8].css"),   
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',//模板路径
      inject: true,
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

