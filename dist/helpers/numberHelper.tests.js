"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var handlebars_1 = require("handlebars");
var numberHelper_1 = require("./numberHelper");
describe('numberHelper', function () {
    before(function () {
        handlebars_1.registerHelper('number', numberHelper_1.numberHelper);
    });
    after(function () {
        handlebars_1.unregisterHelper('number');
    });
    it('returns number', function () {
        var html = "{{ number 1234 }}";
        var template = handlebars_1.compile(html);
        var actual = template(1234);
        chai_1.assert.strictEqual(actual, "1234");
    });
    it('returns empty string if undefined', function () {
        var html = "{{ number value }}";
        var template = handlebars_1.compile(html);
        var actual = template({});
        chai_1.assert.strictEqual(actual, "");
    });
    it('returns empty string if null', function () {
        var html = "{{ number value }}";
        var template = handlebars_1.compile(html);
        var actual = template({ value: null });
        chai_1.assert.strictEqual(actual, "");
    });
    it('trims off zeros', function () {
        var html = "{{ number value }}";
        var template = handlebars_1.compile(html);
        var actual = template({ value: 123.4000 });
        chai_1.assert.strictEqual(actual, "123.4");
    });
    it('trims off zeros for strings', function () {
        var html = "{{ number value }}";
        var template = handlebars_1.compile(html);
        var actual = template({ value: "123.4000" });
        chai_1.assert.strictEqual(actual, "123.4");
    });
});
