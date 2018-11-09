const assert = require('assert');
const VuefileDom = require('../classes/vuefile-dom');

describe('VuefileDom class', function() {

    it('reads the script', function() {
        var vuescript = '{ data: () => {} }';
        var script = 'export default ' + vuescript;
        var dom = new VuefileDom('<script>' + script + '</script>');
        assert.equal(dom.readScript(), vuescript);
    })

    it('throws error if the script does not exist', function () {
        var dom = new VuefileDom('');
        assert.throws(() => dom.readScript());
    })

    it('throws error if there is more than one script', function () {
        var dom = new VuefileDom('<script></script><script></script>');
        assert.throws(() => dom.readScript());
    })

    it('reads the template', function () {
        var tpl = '<div></div>';
        var dom = new VuefileDom('<template>' + tpl + '</template>');
        assert.equal(dom.readTemplate(), tpl);
    })

    it('throws error if the template does not exist', function () {
        var dom = new VuefileDom('');
        assert.throws(() => dom.readTemplate());
    })

    it('throws error if there is more than one template', function () {
        var dom = new VuefileDom('\
            <template></template>\
            <template></template>\
        ');
        assert.throws(() => dom.readScript());
    })

    it('reads the style', function() {
        var style = '.class { color: red }';
        var dom = new VuefileDom('<style>' + style + '</style>');
        assert.equal(dom.readStyle().getContent(), style);
    })

    it('returns null if there is no style', function () {
        var dom = new VuefileDom('');
        assert.equal(dom.readStyle(), null);
    })

    it('throws error if there is more than one style', function () {
        var dom = new VuefileDom('\
            <style></style>\
            <style></style>\
        ');
        assert.throws(() => dom.readStyle());
    })
})