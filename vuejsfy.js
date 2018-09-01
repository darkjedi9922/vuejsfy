'use strict';

const fs = require('fs');
const File = require('./classes/file');
const fileFind = require('adequate-file-finder');
const FilePath = require('./classes/file-path');
const VuefilePath = require('./classes/vuefile-path');
const VuefileCompiler = require('./classes/vuefile-compiler');

/**
 * options.htmlformat: bool
 * options.dest - destJs + destCss
 * options.destJs - directory for compiled js file
 * options.destCss - directory for compiled css file
 */
function compile(filename, options) {

    var vueContent = fs.readFileSync(filename);
    var vuefilePath = new VuefilePath(filename);
    var componentName = vuefilePath.getComponentName(options.htmlformat);
    var destJsDir = (options.destJs || options.dest || new FilePath(filename).getDir());
    var destCssDir = (options.destCss || options.dest || new FilePath(filename).getDir());
    var compiler = new VuefileCompiler(componentName, vueContent);

    compileJs(compiler, destJsDir);
    compileStyle(compiler, destCssDir);
}

// options are the same as in compile()
function compileByPattern(filenamePattern, options) {
    var files = fileFind(filenamePattern);
    for (var i = 0; i < files.length; ++i) compile(files[i], options);
}

// (compiler: VuefileCompiler, dir: string)
function compileJs(compiler, dir) {
    var file = File.openToWrite(dir + '/' + compiler.componentName + '.vue.js');
    file.write(compiler.compileJs());
    file.close();
}

// (compiler: VuefileCompiler, dir: string)
function compileStyle(compiler, dir) {
    var css = compiler.compileCss();
    if (!css) return;
    var file = File.openToWrite(dir + '/' + compiler.componentName + '.vue.css');
    file.write(css);
    file.close();
}

module.exports = compileByPattern;