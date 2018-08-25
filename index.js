'use strict';

var Vuefile = require('./vuefile').Vuefile;

var filename = process.argv[2];
if (filename === undefined) {
    console.log('Filename was not passed\nUsage: node vuejsfy <file>');
    process.exit(1);
}

var vuefile = new Vuefile(filename);
var outfile = vuefile.getDir() + '/' + vuefile.getComponentName();
vuefile.compile(outfile + '.vue.js', outfile + '.vue.css');