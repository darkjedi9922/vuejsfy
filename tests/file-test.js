const fs = require('fs');
const assert = require('assert');
const File = require('../classes/file');

describe('File class', function() {

    it('creates non-existence file and its non-existence dir when it opens to write', function() {
        var file = new File('tests/example/new-dir/new-file');
        
        assert.ok(fs.existsSync('tests/example/new-dir/new-file'));

        file.close();
        fs.unlinkSync('tests/example/new-dir/new-file');
        fs.rmdirSync('tests/example/new-dir');
    })

    it('opens existence file to write', function() {
        var file = new File('tests/example/new-file');
        
        assert.doesNotThrow(() => fs.writeFileSync(file.descriptor, 'some text'));

        fs.unlinkSync('tests/example/new-file');
    })

    it('writes content to the file', function() {
        var file = new File('tests/example/test-file');
        file.write('some text');

        fs.closeSync(file.descriptor);
        
        assert.equal(fs.readFileSync('tests/example/test-file'), 'some text');
    
        fs.writeFileSync('tests/example/test-file', '');
    })

    it('closes the file', function() {
        var file = new File('tests/example/test-file');

        assert.doesNotThrow(() => file.close())
    })
})