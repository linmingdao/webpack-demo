'use strict'

var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config.js')

new WebpackDevServer(webpack(config), {
    open: true,
    hot: true,
    historyApiFallback: true
}).listen(3030, '0.0.0.0', function (err, result) {
    if (err) {
        console.log(err)
    }
    console.log('Listening at localhost:3030')
})