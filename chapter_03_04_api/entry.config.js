//entry.config.js
var path = require('path');
var fs = require('fs');

let entry_files = {};

function each_file(dir) {
    try {
        fs.readdirSync(dir).forEach(function (file) {
            var file_path = dir + '/' + file;
            var fname = path.basename(file, '.js');
            entry_files[fname] = `${file_path}/${fname}.js`;
        })
    } catch (e) {
        
    }
}

each_file('./src/pages');

module.exports = entry_files;