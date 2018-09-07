const assert = require('assert');
const VuefilePath = require('../classes/vuefile-path');

describe('VuefilePath class', function() {

    it('gives the component name without formatting', function() {
        var path = new VuefilePath('path/to/Component.vue');
        assert.equal(path.getComponentName(), 'Component');
    })

    it('gives the component name with html formatting', function() {
        var path = new VuefilePath('/path/to/MyComponent.vue');
        assert.equal(path.getComponentName(true), 'my-component');
    })
})