'use strict';

const fs = require('fs');
const FilePath = require('./file-path');

function File(path) {
    this.path = path;
    new FilePath(path).createDir();
    this.descriptor = fs.openSync(path, 'w');
}

// (content: string)
File.prototype.write = function(content) {
    fs.writeFileSync(this.descriptor, content);
}

File.prototype.close = function() {
    fs.closeSync(this.descriptor);
}

module.exports = File;