"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var handlebars_1 = require("handlebars");
var timeHelper_1 = require("./timeHelper");
describe('timeHelper', function () {
    before(function () {
        handlebars_1.registerHelper('time', timeHelper_1.timeHelper);
    });
    after(function () {
        handlebars_1.unregisterHelper('time');
    });
    it("returns empty string for null", function () {
        var template = handlebars_1.compile("{{time value}}");
        var actual = template({ value: null });
        chai_1.assert.strictEqual(actual, '');
    });
    it("returns time", function () {
        var template = handlebars_1.compile("{{time value}}");
        var actual = template({ value: '18:25:00' });
        chai_1.assert.strictEqual(actual, "6:25 PM");
    });
    it("returns time for pattern", function () {
        var template = handlebars_1.compile("{{time value 'h:mm A'}}");
        var actual = template({ value: '18:25:00' });
        chai_1.assert.strictEqual(actual, "6:25 PM");
    });
    it("returns time for pattern and locale", function () {
        var template = handlebars_1.compile("{{time value 'LT' 'en-GB'}}");
        var actual = template({ value: '18:25:00' });
        chai_1.assert.strictEqual(actual, "18:25");
    });
});
