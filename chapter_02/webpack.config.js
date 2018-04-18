const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    // 启用source-map
    devtool: "source-map",
    // 配置webpack-dev-server
    devServer: {
        contentBase: './dist'
    },
    // JavaScript 执行入口文件
    entry: './main.js',
    output: {
        // 把所有依赖的模块合并输出到一个 bundle.js 文件
        filename: 'bundle.js',
        // 把输出文件都放到 dist 目录下
        path: path.resolve(__dirname, './dist'),
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
        new ExtractTextPlugin({
            // 从 .js 文件中提取出来的 .css 文件的名称
            // filename: `[name]_[contenthash:8].css`,
            filename: `[name].css`,
        })
    ]
};