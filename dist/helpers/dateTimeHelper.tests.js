"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var handlebars_1 = require("handlebars");
var dateTimeHelper_1 = require("./dateTimeHelper");
describe('dateTimeHelper', function () {
    before(function () {
        handlebars_1.registerHelper('datetime', dateTimeHelper_1.dateTimeHelper);
    });
    after(function () {
        handlebars_1.unregisterHelper('datetime');
    });
    it("returns empty string for null", function () {
        var template = handlebars_1.compile("{{datetime value}}");
        var actual = template({ value: null });
        chai_1.assert.strictEqual(actual, '');
    });
    it("returns datetime", function () {
        var template = handlebars_1.compile("{{datetime value}}");
        var actual = template({ value: '2015-12-25T18:25:00' });
        chai_1.assert.strictEqual(actual, "12/25/2015 6:25 PM");
    });
    it("returns datetime for pattern", function () {
        var template = handlebars_1.compile("{{datetime value 'MMM D, YYYY h:mm A'}}");
        var actual = template({ value: '2015-12-25T18:25:00' });
        chai_1.assert.strictEqual(actual, "Dec 25, 2015 6:25 PM");
    });
    it("returns datetime for pattern and locale", function () {
        var template = handlebars_1.compile("{{datetime value 'L LT' 'en-GB'}}");
        var actual = template({ value: '2015-12-25T18:25:00' });
        chai_1.assert.strictEqual(actual, "25/12/2015 18:25");
    });
});
