const path = require('path');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 启用source-map
    devtool: "source-map",
    // 配置webpack-dev-server
    devServer: {
        // contentBase: path.resolve(__dirname, './dist')
    },
    // 执行入口文件
    entry: './src/js/main.js',
    output: {
        // 把输出文件都放到 dist 目录下
        path: path.resolve(__dirname, './dist'),
        // 把所有依赖的模块合并输出到一个 bundle.js 文件
        filename: 'js/[name].[hash].js'
    },
    module: {
        rules: [{
            // 用正则去匹配要用该 loader 转换的 CSS 文件
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                // 转换 .css 文件需要使用的 Loader
                use: ['css-loader'],
            }),
        }]
    },
    plugins: [
        // 从 .js 文件中提取出来的 .css 文件的名称
        new ExtractTextPlugin({
            filename: `style/[name].[contenthash:8].css`
        }),
        // 动态生成html模板
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ]
};