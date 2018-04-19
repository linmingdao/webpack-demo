const path = require('path');
const Webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var entry_files = require('./entry.config');
var base_plugins = require('./htmlWebpackPlugin.config');

module.exports = {
    entry: entry_files,
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].[hash].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: path.resolve(__dirname, 'node_modules'),
            loader: "babel-loader"
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader?minimize', 'sass-loader']
            }),
        }]
    },
    plugins: [
        // 动态生成html模板
        ...base_plugins,
        new ExtractTextPlugin({
            filename: `style/[name].[contenthash:8].css`
        }),
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new UglifyJsPlugin({
            test: /\.js($|\?)/i
        })
    ]
};