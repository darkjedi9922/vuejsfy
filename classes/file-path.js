'use strict';

const fs = require('fs');

function FilePath(path) {
    this.path = path;
}

FilePath.prototype.createDir = function() {
    var dir = this.getDir();
    if (fs.existsSync(dir)) return;
    var sections = dir.split('/');
    var path = '';
    for (var i = 0; i < sections.length; ++i) {
        path += sections[i] + '/';
        if (!fs.existsSync(path)) fs.mkdirSync(path);
    }
}

// () => string
FilePath.prototype.getDir = function() {
    if (this.path.indexOf('/') === -1) return '';
    return this.path.split('/').slice(0, -1).join('/');
}

module.exports = FilePath;