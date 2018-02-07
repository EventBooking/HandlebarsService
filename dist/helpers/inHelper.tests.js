"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var handlebars_1 = require("handlebars");
var inHelper_1 = require("./inHelper");
describe('inHelper', function () {
    before(function () {
        handlebars_1.registerHelper('in', inHelper_1.inHelper);
    });
    after(function () {
        handlebars_1.unregisterHelper('in');
    });
    it('returns false when no property', function () {
        var template = handlebars_1.compile("{{in}}");
        var actual = template({});
        chai_1.assert.strictEqual(actual, "false");
    });
    it('returns false when no value', function () {
        var template = handlebars_1.compile("{{in value}}");
        var actual = template({ value: "foo" });
        chai_1.assert.strictEqual(actual, "false");
    });
    it('returns false when not equal', function () {
        var template = handlebars_1.compile("{{in value 'foo1'}}");
        var actual = template({ value: "foo" });
        chai_1.assert.strictEqual(actual, "false");
    });
    it('returns true when equal', function () {
        var template = handlebars_1.compile("{{in value 'foo'}}");
        var actual = template({ value: "foo" });
        chai_1.assert.strictEqual(actual, "true");
    });
    it('returns true when matching any value', function () {
        var template = handlebars_1.compile("{{in value values}}");
        var actual = template({ value: "foo", values: ["foo", "bar"] });
        chai_1.assert.strictEqual(actual, "true");
    });
});
describe('notInHelper', function () {
    before(function () {
        handlebars_1.registerHelper('notin', inHelper_1.notInHelper);
    });
    after(function () {
        handlebars_1.unregisterHelper('notin');
    });
    it('returns true when not matching any value', function () {
        var template = handlebars_1.compile("{{notin value values}}");
        var actual = template({ value: "foo", values: ["bar", "baz"] });
        chai_1.assert.strictEqual(actual, "true");
    });
    it('returns false when matching any value', function () {
        var template = handlebars_1.compile("{{notin value values}}");
        var actual = template({ value: "foo", values: ["foo", "bar"] });
        chai_1.assert.strictEqual(actual, "false");
    });
});
