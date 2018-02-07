"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var handlebars_1 = require("handlebars");
var optionalDateTimeHelper_1 = require("./optionalDateTimeHelper");
describe('optionalDateTimeHelper', function () {
    before(function () {
        handlebars_1.registerHelper('optionaldatetime', optionalDateTimeHelper_1.optionalDateTimeHelper);
    });
    after(function () {
        handlebars_1.unregisterHelper('optionaldatetime');
    });
    it("returns empty string for null", function () {
        var template = handlebars_1.compile("{{optionaldatetime value}}");
        var actual = template({ value: null });
        chai_1.assert.strictEqual(actual, '');
    });
    it("returns datetime", function () {
        var template = handlebars_1.compile("{{optionaldatetime value}}");
        var value = {
            date: '2015-12-25',
            isAllDay: true
        };
        var actual = template({ value: value });
        chai_1.assert.strictEqual(actual, "12/25/2015");
    });
    it("returns datetime with start and end", function () {
        var template = handlebars_1.compile("{{optionaldatetime value}}");
        var value = {
            date: '2015-12-25',
            isAllDay: false,
            startTime: '08:00:00',
            endTime: '17:00:00'
        };
        var actual = template({ value: value });
        chai_1.assert.strictEqual(actual, "Dec 25, 2015, 8 AM - 5 PM");
    });
    it("returns datetime for locale", function () {
        var template = handlebars_1.compile("{{optionaldatetime value 'en-GB'}}");
        var value = {
            date: '2015-12-25',
            isAllDay: true
        };
        var actual = template({ value: value });
        chai_1.assert.strictEqual(actual, "25/12/2015");
    });
});
