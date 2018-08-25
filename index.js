'use strict';

var Vuefile = require('./vuefile');

var filename = process.argv[2];
if (filename === undefined) {
    console.log('Filename was not passed\nUsage: node vuejsfy <file>');
    process.exit(1);
}

var vuefile = new Vuefile(filename);
vuefile.compile(vuefile.getDir() + '/' + vuefile.getComponentName() + '.vue.js');