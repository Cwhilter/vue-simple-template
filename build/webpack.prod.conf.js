var path = require('path');
var baseConf = require('./webpack.base.conf');
var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')//动态插入js和css文件
var CleanPlugin = require('clean-webpack-plugin')//webpack插件，用于清除目录文件 
var CopyWebpackPlugin = require('copy-webpack-plugin')
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
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
        // new BundleAnalyzerPlugin({
        //     //  可以是`server`，`static`或`disabled`。
        //     //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
        //     //  在“静态”模式下，会生成带有报告的单个HTML文件。
        //     //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
        //     analyzerMode: 'server',
        //     //  将在“服务器”模式下使用的主机启动HTTP服务器。
        //     analyzerHost: '127.0.0.1',
        //     //  将在“服务器”模式下使用的端口启动HTTP服务器。
        //     analyzerPort: 8888, 
        //     //  路径捆绑，将在`static`模式下生成的报告文件。
        //     //  相对于捆绑输出目录。
        //     reportFilename: 'report.html',
        //     //  模块大小默认显示在报告中。
        //     //  应该是`stat`，`parsed`或者`gzip`中的一个。
        //     //  有关更多信息，请参见“定义”一节。
        //     defaultSizes: 'parsed',
        //     //  在默认浏览器中自动打开报告
        //     openAnalyzer: true,
        //     //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
        //     generateStatsFile: false, 
        //     //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
        //     //  相对于捆绑输出目录。
        //     statsFilename: 'stats.json',
        //     //  stats.toJson（）方法的选项。
        //     //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
        //     //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
        //     statsOptions: null,
        //     logLevel: 'info' //日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
        // })
    ]
})