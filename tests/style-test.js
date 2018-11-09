const assert = require('assert');
const jsdom = require('jsdom');
const Style = require('../classes/style');

var window = new jsdom.JSDOM().window;
var document = window.document;

describe('Style class', function() {

    it('gets content', function() {
        var elem = document.createElement("style");
        var css = ".hello { color: red }";
        elem.textContent = css;

        var style = new Style(elem);
        assert.equal(style.getContent(), css);
    })

    it('gets lang', function() {
        var elem = document.createElement("style");
        elem.lang = "stylus";

        var style = new Style(elem);
        assert.equal(style.getLang(), "stylus");
    })

    it('gets file extension', function() {
        var elem = document.createElement("style");
        elem.lang = "stylus";

        var style = new Style(elem);
        assert.equal(style.getFileExt(), "styl");
    })

    it('gets file extension of unknown lang as equal the lang', function() {
        var elem = document.createElement("style");
        var lang = "unknwn";
        elem.lang = lang;

        var style = new Style(elem);
        assert.equal(style.getFileExt(), lang);
    })
})