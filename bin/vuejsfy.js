#!/usr/bin/env node

'use strict';

var argv = require('minimist')(process.argv.slice(2));
var vuejsfy = require('..');

vuejsfy(argv._[0], argv);