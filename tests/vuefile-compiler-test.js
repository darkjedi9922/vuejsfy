const fs = require('fs');
const assert = require('assert');
const VuefileCompiler = require('../classes/vuefile-compiler');

describe('VuefileCompiler class', function() {

    it('compiles js', function() {
        var content = fs.readFileSync('tests/example/example.vue');
        var expected = fs.readFileSync('tests/example/example.js');
        var compiler = new VuefileCompiler('example', content);
        assert.equal(compiler.compileJs(), expected);
    })

    it('compiles css', function () {
        var content = fs.readFileSync('tests/example/example.vue');
        var expected = fs.readFileSync('tests/example/example.css');
        var compiler = new VuefileCompiler('example', content);
        assert.equal(compiler.compileCss(), expected);
    })

    it('returns null if there is no style', function () {
        var compiler = new VuefileCompiler('example', '');
        assert.equal(compiler.compileCss(), null);
    })
})