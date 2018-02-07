"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var handlebars_1 = require("handlebars");
var joinHelper_1 = require("./joinHelper");
describe('getValues', function () {
    it("returns empty values", function () {
        var result = joinHelper_1.getValues([]);
        chai_1.assert.strictEqual(result.pattern, ', ');
        chai_1.assert.strictEqual(result.data.length, 0);
    });
    it("returns values", function () {
        var result = joinHelper_1.getValues(['foo', ', ']);
        chai_1.assert.strictEqual(result.pattern, ', ');
        var value1 = result.data[0];
        chai_1.assert.strictEqual(value1, 'foo');
    });
    it("returns values for array", function () {
        var result = joinHelper_1.getValues([['foo', 'bar'], ', ']);
        chai_1.assert.strictEqual(result.pattern, ', ');
        var _a = result.data, value1 = _a[0], value2 = _a[1];
        chai_1.assert.strictEqual(value1, 'foo');
        chai_1.assert.strictEqual(value2, 'bar');
    });
});
describe('joinHelper', function () {
    before(function () {
        handlebars_1.registerHelper('join', joinHelper_1.joinHelper);
    });
    after(function () {
        handlebars_1.unregisterHelper('join');
    });
    it("returns empty when no arguments", function () {
        var template = handlebars_1.compile("{{join}}");
        var actual = template({});
        chai_1.assert.strictEqual(actual, '');
    });
    it("returns empty when no values", function () {
        var template = handlebars_1.compile("{{join ', '}}");
        var actual = template({});
        chai_1.assert.strictEqual(actual, '');
    });
    it("returns empty when single value", function () {
        var template = handlebars_1.compile("{{join value ', '}}");
        var actual = template({ value: "foo" });
        chai_1.assert.strictEqual(actual, 'foo');
    });
    it("returns joined array", function () {
        var template = handlebars_1.compile("{{join values ', '}}");
        var actual = template({ values: ["foo", "bar"] });
        chai_1.assert.strictEqual(actual, 'foo, bar');
    });
    it("returns joined array from multiple values", function () {
        var template = handlebars_1.compile("{{join values ', '}}");
        var actual = template({ values: ["foo", "bar"] });
        chai_1.assert.strictEqual(actual, 'foo, bar');
    });
    it("returns joined array from an array and value", function () {
        var template = handlebars_1.compile("{{join value1 value2 ', '}}");
        var actual = template({ value1: ["foo", "bar"], value2: "baz" });
        chai_1.assert.strictEqual(actual, 'foo, bar, baz');
    });
    it("returns joined array from multiple arrays", function () {
        var template = handlebars_1.compile("{{join value1 value2 ', '}}");
        var actual = template({ value1: ["foo", "bar"], value2: ["baz", "fiz"] });
        chai_1.assert.strictEqual(actual, 'foo, bar, baz, fiz');
    });
});
describe('joinDinstictHelper', function () {
    before(function () {
        handlebars_1.registerHelper('join-distinct', joinHelper_1.joinDistinctHelper);
    });
    after(function () {
        handlebars_1.unregisterHelper('join-distinct');
    });
    it("returns distinct list", function () {
        var template = handlebars_1.compile("{{join-distinct list ', '}}");
        var actual = template({ list: ["foo", "foo", "bar"] });
        chai_1.assert.strictEqual(actual, 'foo, bar');
    });
});
