const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let pagesArray = [];

function each_file(dir) {
    try {
        fs.readdirSync(dir).forEach(function (file) {
            const file_obj = {};
            const file_path = dir + '/' + file;
            const chunk_name = path.basename(file, '.html');
            file_obj['filename'] = file;
            file_obj['template'] = file_path;
            file_obj['chuckName'] = chunk_name;
            pagesArray.push(file_obj);
        })
    } catch (e) {

    }
}

each_file('./src/templates');

let base_plugins = [];
pagesArray.forEach(page => {
    base_plugins.push(new HtmlWebpackPlugin({
        template: page.template,
        filename: page.filename,
        chunks: [page.chuckName],
        minify: {
            removeComments: true,
            collapseWhitespace: false
        }
    }))
});


module.exports = base_plugins;