var path = require('path');
var baseConf = require('./webpack.base.conf');
var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')//动态插入js和css文件
var CleanPlugin = require('clean-webpack-plugin')//webpack插件，用于清除目录文件 
var CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = merge(baseConf, {
    module: {
        rules: [{
            test: /.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader",
                publicPath: "/"
            })
        },
        {
            test: /\.vue$/,
            use: [
                {
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
                }
            ]
        },]
    },
    //devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new CleanPlugin(['./dist/**/*'], {
            root: path.resolve(__dirname, '../'),
            verbose: true,
            dry: false,
            exclude: ['favicon.ico']
        }), //清空生成目录
        //new CleanPlugin(['./dist/**/*']), //清空生成目录
        // new webpack.optimize.UglifyJsPlugin({
        //   sourceMap: false,
        //   compress: {
        //     warnings: false
        //   }
        // }),
        new CopyWebpackPlugin([
            { from: 'static/.htaccess', to: '' },            
            { from: 'static/js', to: 'js' },
            { from: 'static/css', to: 'css'},
            { from: 'static/fonts', to: 'fonts'}
        ]),
        new webpack.DllReferencePlugin({       // 敲黑板，这里是重点
            context: __dirname,                  // 同那个dll配置的路径保持一致
            manifest: require('../manifest.json') // manifest的缓存信息
        }),
        new UglifyJsPlugin({
            sourceMap: false,
            uglifyOptions: {
                warnings: false
            }            
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: false,
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            minChunks (module) {
              // any required modules inside node_modules are extracted to vendor
              return (
                module.resource &&
                /\.js$/.test(module.resource) &&
                module.resource.indexOf(
                  path.join(__dirname, '../node_modules')
                ) === 0
              )
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
        }),

    ]
})