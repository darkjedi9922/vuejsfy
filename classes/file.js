'use strict';

const fs = require('fs');
const FilePath = require('./file-path');

// (filepath: string) => File
File.openToWrite = function(path) {
    new FilePath(path).createDir();
    var descriptor = fs.openSync(path, 'w');
    return new File(path, descriptor);
}

// (path: string, descriptor: number)
function File(path, descriptor) {
    this.path = path;
    this.descriptor = descriptor;
}

// (content: string)
File.prototype.write = function(content) {
    fs.writeFileSync(this.descriptor, content);
}

File.prototype.close = function() {
    fs.closeSync(this.descriptor);
}

module.exports = File;