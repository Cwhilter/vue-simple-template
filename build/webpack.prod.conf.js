var path =require('path');
var baseConf = require('./webpack.base.conf');
var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')//动态插入js和css文件
var CleanPlugin = require('clean-webpack-plugin')//webpack插件，用于清除目录文件 

module.exports = merge(baseConf, {
  module: {
    rules: [{
      test: /.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader",
        publicPath: "/dist/"
      })
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          css: ExtractTextPlugin.extract({
            use: 'css-loader',
            fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
          })
        }/*,
              loaders: {
                less: 'less-loader'
              },*/
        // other vue-loader options go here
      }
    },]
  },
  //devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new CleanPlugin(['./dist/**/*'],{
      root: path.resolve(__dirname, '../'),
      verbose: true,
      dry: false,
      exclude: ['favicon.ico']
    }), //清空生成目录
    //new CleanPlugin(['./dist/**/*']), //清空生成目录
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
      hash: true,
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
  ]
})