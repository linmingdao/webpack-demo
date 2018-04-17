// 通过 CommonJS 规范导入 CSS 模块
require('../style/home.css');

require('./common.js');

// 通过 CommonJS 规范导入 show 函数
const show = require('./show.js');

// 执行 show 函数
show('home page');