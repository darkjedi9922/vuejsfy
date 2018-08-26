'use strict';

const fs = require('fs');
const jsdom = require('jsdom');
const paramCase = require('param-case');

const { JSDOM } = jsdom;

/**
 * options.htmlformat: bool
 * options.dest - destJs + destCss
 * options.destJs - directory for compiled js file
 * options.destCss - directory for compiled css file
 */
module.exports = function (filename, options) {

    var vueContent = fs.readFileSync(filename);
    var vueDom = new JSDOM(vueContent);
    var template = readTemplate(vueDom);
    var script = readScript(vueDom);
    var style = readStyle(vueDom);
    var componentName = getComponentName(filename, options.htmlformat);
    var vueFileDir = getFileDir(filename);
    var destJsDir = options.destJs || options.dest || vueFileDir;
    var destCssDir = options.destCss || options.dest || vueFileDir;

    compileJs(componentName, assembleJs(componentName, script, template), destJsDir);
    if (style) compileStyle(componentName, style, destCssDir);
}

// (filepath: string) => descriptor: number
function openFile(filepath) {
    var dir = getFileDir(filepath);
    if (!fs.existsSync(dir)) createDir(dir);
    return fs.openSync(filepath, 'w');
}

// (descriptor: number)
function closeFile(descriptor) {
    fs.closeSync(descriptor);
}

// (dir: string)
function createDir(dir) {
    var paths = dir.split('/');
    var path = '';
    for (var i = 0; i < paths.length; ++i) {
        path += paths[i] + '/';
        if (!fs.existsSync(path)) fs.mkdirSync(path);
    }
}

// (filename: string) => string
function getFileDir(filename) {
    if (filename.indexOf('/') === -1) return '';
    return filename.split('/').slice(0, -1).join('/');
}

// (dom: JSDOM) => string
function readTemplate(dom) {
    var templates = dom.window.document.getElementsByTagName('template');
    if (templates.length !== 1) throw new Error('In the file is not only one <template> tag');
    if (templates[0].content.childElementCount !== 1) throw new Error('The template has not only one child element');
    return templates[0].innerHTML.replace(/\r\n|\r|\n/g, '').replace(/ {2,}/g, ' ').trim();
}

// (dom: JSDOM) => string
function readScript(dom) {
    var scripts = dom.window.document.getElementsByTagName('script');
    if (scripts.length !== 1) throw new Error('In the file is not only one <script> tag');
    return scripts[0].textContent.replace('export', '').replace('default', '').trim();
}

// (dom: JSDOM) => string|null
function readStyle(dom) {
    var styles = dom.window.document.getElementsByTagName('style');
    if (styles.length > 1) throw new Error('In .vue file can not be more than one <style> tag');
    else if (styles.length === 1) return styles[0].textContent.trim();
    else return null;
}

// (componentName: string, content: string, dir: string)
function compileJs(componentName, content, dir) {
    var file = openFile(dir + '/' + componentName + '.vue.js');
    fs.writeFileSync(file, content);
    closeFile(file);
}

// (componentName: string, content: string, dir: string)
function compileStyle(componentName, content, dir) {
    var file = openFile(dir + '/' + componentName + '.vue.css');
    fs.writeSync(file, content);
    closeFile(file);
}

// (componentName: string, script: string, template: string) => string
function assembleJs(componentName, script, template) {
    template = "template: '" + template.replace(/'/g, "\\'") + "',";
    script = script.replace('{', '{\n    ' + template);
    return "Vue.component('" + componentName + "', " + script + ");";
}

// (filepath: string, htmlformat: bool) => string
function getComponentName(filename, htmlformat) {
    var path = filename.split('/');
    var name = path[path.length - 1].split('.')[0];
    return htmlformat ? paramCase(name) : name;
}