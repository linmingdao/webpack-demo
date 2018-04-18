const path = require('path');
const Webpack = require('webpack');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {
    AutoWebPlugin
} = require('web-webpack-plugin');

const autoWebPlugin = new AutoWebPlugin('./src/pages', {
    // 页面依赖的模板
    template: './src/templates/template.html',
    // 所有页面依赖的通用的样式
    postEntrys: ['./src/common/common.scss'],
    // 提取所有页面的公共代码
    commonsChunk: {
        name: 'common'
    }
});

module.exports = {
    // devtool: "source-map",
    entry: autoWebPlugin.entry({}),
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
        autoWebPlugin,
        new ExtractTextPlugin({
            filename: `style/[name].[contenthash:8].css`
        }),
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                warnings: false,
                drop_console: true,
                collapse_vars: true,
                reduce_vars: true
            }
        })
    ]
};