'use strict';

const paramCase = require('param-case');

// (path: string)
function VuefilePath(path) {
    this.path = path;
}

// (htmlformat: bool) => string
VuefilePath.prototype.getComponentName = function(htmlformat) {
    var path = this.path.split('/');
    var name = path[path.length - 1].split('.')[0];
    return htmlformat ? paramCase(name) : name;
}

module.exports = VuefilePath;