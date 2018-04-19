const webpack = require('webpack');
const express = require('express');
const middleware = require('webpack-dev-middleware');
const config = require('./webpack.config');

const compiler = webpack(config);

const app = express();
app.use(middleware(compiler, {}));
app.listen(3000, () => console.log('Example app listening on port 3000!'));