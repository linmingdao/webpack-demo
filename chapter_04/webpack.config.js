const path = require('path');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 启用source-map
    // devtool: "source-map",
    // 配置webpack-dev-server
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        compress: true,
        port: 3030,
        headers: {
            "X-Custom-Foo": "bar"
        }
    },
    // 执行入口文件
    entry: {
        home: './src/js/home.js',
        about: './src/js/about.js'
    },
    output: {
        // 把输出文件都放到 dist 目录下
        path: path.resolve(__dirname, './dist'),
        // 把所有依赖的模块合并输出到一个 bundle.js 文件
        filename: 'js/[name].[chunkhash].js'
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
            // filename: `style/[name].[contenthash:8].css`,
            filename: `style/style.css`,
            allChunks: true
        }),
        new Webpack.optimize.CommonsChunkPlugin({
            name: 'react',
            minChunks: function (module, count) {
                const resource = module.resource
                // 以 .css 结尾的资源，重复 require 大于 1 次
                return resource && /\.css$/.test(resource) && count > 1
            }
        }),
        // 动态生成html模板
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['home'],
            inject: 'true',
            hasg: 'true',
            title: 'home',
            minify: {
                removeComments: false,
                collapseWhitespace: false
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/about.html',
            filename: 'about.html',
            chunks: ['about'],
            inject: 'true',
            hasg: 'true',
            title: 'about',
            minify: {
                removeComments: false,
                collapseWhitespace: false
            }
        })
    ]
};