'use strict';

var VuefileDom = require('./vuefile-dom');

function VuefileCompiler(componentName, fileContent) {
    this.componentName = componentName;
    this.content = fileContent;
    this.dom = new VuefileDom(fileContent);
}

VuefileCompiler.prototype.compileJs = function() {
    var template = "template: '" + this.dom.readTemplate().replace(/'/g, "\\'") + "',";
    var script = this.dom.readScript().replace('{', '{\n    ' + template);
    return "Vue.component('" + this.componentName + "', " + script + ");";
}

VuefileCompiler.prototype.compileCss = function() {
    return this.dom.readStyle();
}

module.exports = VuefileCompiler;