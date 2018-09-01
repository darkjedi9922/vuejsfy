'use strict';

var VuefileDom = require('./vuefile-dom');

// (componentName: string fileContent: string)
function VuefileCompiler(componentName, fileContent) {
    this.componentName = componentName;
    this.content = fileContent;
    this.dom = new VuefileDom(fileContent);
}

// () => string
VuefileCompiler.prototype.compileJs = function() {
    var template = "template: '" + this.dom.readTemplate().replace(/'/g, "\\'") + "',";
    var script = this.dom.readScript().replace('{', '{\n    ' + template);
    return "Vue.component('" + this.componentName + "', " + script + ");";
}

// () => string
VuefileCompiler.prototype.compileCss = function() {
    return this.dom.readStyle();
}

module.exports = VuefileCompiler;