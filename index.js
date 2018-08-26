'use strict';

var argv = require('minimist')(process.argv.slice(2));
var vuejsfy = require('./vuejsfy');

if (module.parent) module.exports = vuejsfy;
else vuejsfy(process.argv[2], argv);