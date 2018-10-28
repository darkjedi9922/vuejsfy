const fs = require('fs');
const assert = require('assert');
const vuejsfy = require('..');

describe('module', function() {

    it('compiles .vue', function() {
        var outJs = 'tests/example/HelloComponent.vue.js';
        var outCss = 'tests/example/HelloComponent.vue.css';
        var idealJs = 'tests/example/ideals/HelloComponent.vue.js';
        var idealCss = 'tests/example/ideals/HelloComponent.vue.css';

        vuejsfy('tests/example/HelloComponent.vue');

        assert.ok(fs.existsSync(outJs));
        assert.ok(fs.existsSync(outCss));

        assert.equal(fs.readFileSync(outJs).toString(), fs.readFileSync(idealJs).toString());
        assert.equal(fs.readFileSync(outCss).toString(), fs.readFileSync(idealCss).toString());

        fs.unlinkSync(outJs);
        fs.unlinkSync(outCss);
    })

    it('compiles .vue with the htmlformat option', function () {
        var outJs = 'tests/example/hello-component.vue.js';
        var outCss = 'tests/example/hello-component.vue.css';
        var idealJs = 'tests/example/ideals/hello-component.vue.js';
        var idealCss = 'tests/example/ideals/hello-component.vue.css';

        vuejsfy('tests/example/HelloComponent.vue', { htmlformat: true });

        assert.ok(fs.existsSync(outJs));
        assert.ok(fs.existsSync(outCss));

        assert.equal(fs.readFileSync(outJs).toString(), fs.readFileSync(idealJs).toString());
        assert.equal(fs.readFileSync(outCss).toString(), fs.readFileSync(idealCss).toString());

        fs.unlinkSync(outJs);
        fs.unlinkSync(outCss);
    })

    it('compiles .vue with the dest and destCss option', function () {
        var dest = 'tests/example/dest';
        var destCss = 'tests/example/destCss';
        var outJs = dest + '/HelloComponent.vue.js';
        var outCss =  destCss + '/HelloComponent.vue.css';
        var idealJs = 'tests/example/ideals/HelloComponent.vue.js';
        var idealCss = 'tests/example/ideals/HelloComponent.vue.css';

        vuejsfy('tests/example/HelloComponent.vue', {
            dest: dest,
            destCss: destCss
        });

        assert.ok(fs.existsSync(outJs));
        assert.ok(fs.existsSync(outCss));

        assert.equal(fs.readFileSync(outJs).toString(), fs.readFileSync(idealJs).toString());
        assert.equal(fs.readFileSync(outCss).toString(), fs.readFileSync(idealCss).toString());

        fs.unlinkSync(outJs);
        fs.unlinkSync(outCss);
        fs.rmdirSync(dest);
        fs.rmdirSync(destCss);
    })
})