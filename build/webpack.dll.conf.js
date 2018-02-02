const webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
// console.log(path.resolve(__dirname))
module.exports = {
    entry: {
        vendor: ['axios','vue/dist/vue.esm.js', 'vuex', 'vue-router']
    },
    output: {
        publicPath: '/',
        path: path.resolve('./static'),
        filename: '[name].dll.js',
        library: '[name]_[chunkhash]'               // 必填项，将此dll包暴露到window上，给app.js调用
    },
    plugins: [
        new webpack.DllPlugin({
            context: __dirname,                // 必填项，用来标志manifest中的路径
            path: './manifest.json',    // 必填项，存放manifest的路径
            name: '[name]_[chunkhash]'                     // 必填项，manifest的name
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            }
        }),
    ]
};