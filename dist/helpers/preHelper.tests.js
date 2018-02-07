"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var handlebars_1 = require("handlebars");
var preHelper_1 = require("./preHelper");
describe('preHelper', function () {
    before(function () {
        handlebars_1.registerHelper('pre', preHelper_1.preHelper);
    });
    after(function () {
        handlebars_1.unregisterHelper('pre');
    });
    it("returns empty string for null", function () {
        var template = handlebars_1.compile("{{pre value}}");
        var actual = template({ value: null });
        chai_1.assert.strictEqual(actual, '');
    });
    it('returns empty string if undefined', function () {
        var template = handlebars_1.compile("{{ pre value }}");
        var actual = template({ value: 'test' });
        chai_1.assert.strictEqual(actual, "<span class=\"prewrap\">test</span>");
    });
});
