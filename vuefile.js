'use strict';

var fs = require('fs');
const jsdom = require('jsdom');

// Это то же, что и `JSDOM = jsdom.JSDOM` - деструктурирующее присваивание
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const { JSDOM } = jsdom;

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
    this.dom = new JSDOM(content);
}

// () => string
VuefileContent.prototype.readScriptContent = function() {
    var scripts = this.dom.window.document.getElementsByTagName('script');
    if (scripts.length !== 1) throw new Error('In the file is not only one <script> tag');
    return scripts[0].textContent.replace('export', '').replace('default', '').trim();
}

// () => string
VuefileContent.prototype.readTemplate = function() {
    var templates = this.dom.window.document.getElementsByTagName('template');
    if (templates.length !== 1) throw new Error('In the file is not only one <template> tag');
    if (templates[0].content.childElementCount !== 1) throw new Error('The template has not only one child element');
    return templates[0].innerHTML.replace(/\r\n|\r|\n/g, '').replace(/ {2,}/g, ' ').trim();
}

// () => string|null
VuefileContent.prototype.readCss = function() {
    var styles = this.dom.window.document.getElementsByTagName('style');
    if (styles.length > 1) throw new Error('In .vue file can not be more than one <style> tag');
    else if (styles.length === 1) return styles[0].textContent.trim();
    else return null;
}

exports.Vuefile = Vuefile;
exports.VuefileContent = VuefileContent;