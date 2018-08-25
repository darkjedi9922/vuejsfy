'use strict';

var fs = require('fs');

function Vuefile(filename) {
    this.filename = filename;
    this.path = filename.split('/');
}

Vuefile.prototype.getComponentName = function() {
    return this.path[this.path.length - 1].split('.')[0];
}

Vuefile.prototype.getDir = function() {
    return this.path.slice(0, this.path.length - 1).join('/');
}

Vuefile.prototype.readContent = function() {
    return fs.readFileSync(this.filename, 'utf-8');
}

Vuefile.prototype.readScriptContent = function(str) {
    var start = str.indexOf('<script>') + '<script>'.length;
    var end = str.indexOf('</script>');
    var result = str.slice(start, end);
    return result.replace('export', '').replace('default', '').trim();
}

Vuefile.prototype.readTemplate = function(str) {
    var start = str.indexOf('<template>') + '<template>'.length;
    var end = str.indexOf('</template>');
    var result = str.slice(start, end);
    return result.replace(/\r\n|\r|\n/g, '').replace(/ {2,}/g, ' ').trim();
}

Vuefile.prototype.compile = function(outfile) {
    var outfileDescriptor = fs.openSync(outfile, 'w');
    fs.writeSync(outfileDescriptor, this.assembleJs());
    fs.closeSync(outfileDescriptor);
}

Vuefile.prototype.assembleJs = function() {
    var vuefileContent = this.readContent();
    var body = this.readScriptContent(vuefileContent);
    var template = "template: '" + this.readTemplate(vuefileContent).replace(/'/g, "\\'") + "',";
    body = body.replace('{', '{\n    ' + template);
    return "Vue.component('" + this.getComponentName() + "', " + body + ");";
}

module.exports = Vuefile;