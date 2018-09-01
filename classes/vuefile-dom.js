'use strict';

var jsdom = require('jsdom');

var { JSDOM } = jsdom;

// (content: string)
function VuefileDom(content) {
    this.dom = new JSDOM(content);
}

// () => string
VuefileDom.prototype.readScript = function() {
    var scripts = this.dom.window.document.getElementsByTagName('script');
    if (scripts.length !== 1) throw new Error('In the file is not only one <script> tag');
    return scripts[0].textContent.replace('export', '').replace('default', '').trim();
}

// () => string
VuefileDom.prototype.readTemplate = function() {
    var templates = this.dom.window.document.getElementsByTagName('template');
    if (templates.length !== 1) throw new Error('In the file is not only one <template> tag');
    if (templates[0].content.childElementCount !== 1) throw new Error('The template has not only one child element');
    return templates[0].innerHTML.replace(/\r\n|\r|\n/g, '').replace(/ {2,}/g, ' ').trim();
}

// () => string|null
VuefileDom.prototype.readStyle = function() {
    var styles = this.dom.window.document.getElementsByTagName('style');
    if (styles.length > 1) throw new Error('In .vue file can not be more than one <style> tag');
    else if (styles.length === 1) return styles[0].textContent.trim();
    else return null;
}

module.exports = VuefileDom;