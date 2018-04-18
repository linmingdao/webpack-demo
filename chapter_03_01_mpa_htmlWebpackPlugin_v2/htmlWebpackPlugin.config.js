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
            file_obj['filename'] = `${file}.html`;
            file_obj['template'] = `${file_path}/${file}.html`;
            file_obj['chuckName'] = chunk_name;
            pagesArray.push(file_obj);
        })
    } catch (e) {

    }
}

each_file('./src/pages');

let base_plugins = [];
pagesArray.forEach(page => {
    base_plugins.push(new HtmlWebpackPlugin({
        template: page.template,
        filename: `pages/${page.chuckName}/${page.filename}`,
        chunks: [page.chuckName],
        minify: {
            removeComments: true,
            collapseWhitespace: false
        }
    }))
});
console.log(...base_plugins);

module.exports = base_plugins;