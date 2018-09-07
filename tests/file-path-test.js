const fs = require('fs');
const assert = require('assert');
const FilePath = require('../classes/file-path');

describe('FilePath class', function() {

    it('gives the dir "path/to" of the file "path/to/file"', function() {
        var path = new FilePath('path/to/file');
        assert.equal(path.getDir(), 'path/to');
    })

    it('gives the dir "../path/to" of the file "../path/to/file"', function () {
        var path = new FilePath('../path/to/file');
        assert.equal(path.getDir(), '../path/to');
    })

    it('gives the dir "/path/to" of the file "/path/to/file"', function () {
        var path = new FilePath('/path/to/file');
        assert.equal(path.getDir(), '/path/to');
    })

    it('creates a dir "new-dir" to the file "tests/new-dir/file"', function() {
        var path = new FilePath('tests/new-dir/file');
        path.createDir();

        assert.ok(fs.existsSync('tests/new-dir'));

        fs.rmdirSync('tests/new-dir');
    });

    it('creates a dir "new-dir" to the file "./tests/new-dir/file"', function () {
        var path = new FilePath('./tests/new-dir/file');
        path.createDir();

        assert.ok(fs.existsSync('tests/new-dir'));

        fs.rmdirSync('tests/new-dir');
    });

    it('creates a dir "new-dir" and "new-new-dir" to the file "tests/new-dir/new-new-dir/file"', function() {
        var path = new FilePath('tests/new-dir/new-new-dir/file');
        path.createDir();

        assert.ok(fs.existsSync('tests/new-dir/new-new-dir'));

        fs.rmdirSync('tests/new-dir/new-new-dir');
        fs.rmdirSync('tests/new-dir');
    });
})