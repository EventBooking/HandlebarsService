"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var handlebars_1 = require("handlebars");
var dateHelper_1 = require("./dateHelper");
describe('dateHelper', function () {
    before(function () {
        handlebars_1.registerHelper('date', dateHelper_1.dateHelper);
    });
    after(function () {
        handlebars_1.unregisterHelper('date');
    });
    it("returns empty string for null", function () {
        var template = handlebars_1.compile("{{date value}}");
        var actual = template({ value: null });
        chai_1.assert.strictEqual(actual, '');
    });
    it("returns date", function () {
        var template = handlebars_1.compile("{{date value}}");
        var actual = template({ value: '2015-12-25' });
        chai_1.assert.strictEqual(actual, "12/25/2015");
    });
    it("returns date for pattern", function () {
        var template = handlebars_1.compile("{{date value 'MMM D, YYYY'}}");
        var actual = template({ value: '2015-12-25' });
        chai_1.assert.strictEqual(actual, "Dec 25, 2015");
    });
    it("returns date for pattern and locale", function () {
        var template = handlebars_1.compile("{{date value 'L' 'en-GB'}}");
        var actual = template({ value: '2015-12-25' });
        chai_1.assert.strictEqual(actual, "25/12/2015");
    });
});
