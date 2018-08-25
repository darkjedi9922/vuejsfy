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

Vuefile.prototype.compile = function(jsOutfile, cssOutfile) {
    var content = new VuefileContent(this.readContent());
    this.compileJs(jsOutfile, content);
    this.compileCss(cssOutfile, content);
}

Vuefile.prototype.compileJs = function(jsOutfile, content) {
    var outfileDescriptor = fs.openSync(jsOutfile, 'w');
    fs.writeSync(outfileDescriptor, this.assembleJs(content));
    fs.closeSync(outfileDescriptor);
}

Vuefile.prototype.compileCss = function(cssOutfile, content) {
    var css = content.readCss();
    if (!css) return;
    var outfileDescriptor = fs.openSync(cssOutfile, 'w');
    fs.writeSync(outfileDescriptor, css);
    fs.closeSync(outfileDescriptor);
}

Vuefile.prototype.assembleJs = function(content) {
    var vuefileContent = this.readContent();
    var body = content.readScriptContent(vuefileContent);
    var template = "template: '" + content.readTemplate(vuefileContent).replace(/'/g, "\\'") + "',";
    body = body.replace('{', '{\n    ' + template);
    return "Vue.component('" + this.getComponentName() + "', " + body + ");";
}

function VuefileContent(content) {
    this.content = content;
}

// () => string
VuefileContent.prototype.readScriptContent = function() {
    var start = this.content.indexOf('<script>') + '<script>'.length;
    var end = this.content.indexOf('</script>');
    var result = this.content.slice(start, end);
    return result.replace('export', '').replace('default', '').trim();
}

// () => string
VuefileContent.prototype.readTemplate = function() {
    var start = this.content.indexOf('<template>') + '<template>'.length;
    var end = this.content.indexOf('</template>');
    var result = this.content.slice(start, end);
    return result.replace(/\r\n|\r|\n/g, '').replace(/ {2,}/g, ' ').trim();
}

// () => string|null
VuefileContent.prototype.readCss = function() {
    var end = this.content.indexOf('</style>');
    if (end === -1) return null;
    var start = this.content.indexOf('<style>') + '<style>'.length;
    var result = this.content.slice(start, end);
    return result.trim();
}

exports.Vuefile = Vuefile;
exports.VuefileContent = VuefileContent;