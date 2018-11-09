'use strict';

var jsdom = require('jsdom');

var { JSDOM } = jsdom;

var styleLangFormats = {
    "stylus": "styl"
}

function Style(styleElement) {
    this.element = styleElement;
}

Style.prototype.getContent = function() {
    return this.element.textContent.trim();
}

Style.prototype.getLang = function() {
    return this.element.lang.trim().toLowerCase() || 'css';
}

Style.prototype.getFileExt = function() {
    var lang = this.getLang();
    var ext = styleLangFormats[lang];
    return ext || lang;
}

module.exports = Style;