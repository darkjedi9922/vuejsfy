'use strict';

var Vuefile = require('./vuefile').Vuefile;
var argv = require('minimist')(process.argv.slice(2));
var paramCase = require('param-case');

var filename = process.argv[2];
if (filename === undefined) {
    console.log('Filename was not passed\nUsage: node vuejsfy <file>');
    process.exit(1);
}

var vuefile = new Vuefile(filename);
var componentName = vuefile.getComponentName();
if (argv.case === 'param') componentName = paramCase(componentName);
var outfile = vuefile.getDir() + '/' + componentName;
vuefile.compile(outfile + '.vue.js', outfile + '.vue.css', componentName);