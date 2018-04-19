const webpack = require('webpack');
const config = require('./webpack.config');

// 立即启动构建一次项目
// webpack(config, (err, stats) => {
//     if (err || stats.hasErrors()) {
//         // 构建过程出错
//     }
//     // 成功执行完构建
// });

// 以监听模式运行
const compiler = webpack(config);
const watching = compiler.watch({
    aggregateTimeout: 300
}, (err, stats) => {
    console.log('文件发生变动，重新构建...');
});
// watching.close(() => {
// });