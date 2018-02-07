"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var handlebars_1 = require("handlebars");
var dateRangesHelper_1 = require("./dateRangesHelper");
describe('dateRangesHelper', function () {
    before(function () {
        handlebars_1.registerHelper('date-ranges', dateRangesHelper_1.dateRangesHelper);
    });
    after(function () {
        handlebars_1.unregisterHelper('date-ranges');
    });
    describe('isContiguosDate', function () {
        it("returns true for contiguous dates", function () {
            chai_1.assert.isTrue(dateRangesHelper_1.isContiguosDate('2018-01-31', '2018-02-01'));
        });
        it("returns false for non-contiguous dates", function () {
            chai_1.assert.isFalse(dateRangesHelper_1.isContiguosDate('2018-02-06', '2018-02-08'));
        });
    });
    it("returns empty string for null", function () {
        var template = handlebars_1.compile("{{date-ranges values}}");
        var actual = template({ dates: null });
        chai_1.assert.strictEqual(actual, '');
    });
    it('returns single date', function () {
        var template = handlebars_1.compile("{{date-ranges dates}}");
        var values = [
            '2018-01-05'
        ];
        var actual = template({ dates: values });
        chai_1.assert.strictEqual(actual, "1/5/2018");
    });
    it('returns non-distinct dates', function () {
        var template = handlebars_1.compile("{{date-ranges dates}}");
        var values = [
            '2018-01-06',
            '2018-01-06'
        ];
        var actual = template({ dates: values });
        chai_1.assert.strictEqual(actual, "1/6/2018");
    });
    it('returns single range', function () {
        var template = handlebars_1.compile("{{date-ranges dates}}");
        var values = [
            '2018-02-01',
            '2018-01-31'
        ];
        var actual = template({ dates: values });
        chai_1.assert.strictEqual(actual, "1/31/2018 - 2/1/2018");
    });
    it('returns multiple ranges', function () {
        var template = handlebars_1.compile("{{date-ranges dates}}");
        var values = [
            '2016-10-08',
            '2016-10-09',
            '2016-10-10',
            '2016-10-15',
            '2016-10-16'
        ];
        var actual = template({ dates: values });
        chai_1.assert.strictEqual(actual, "10/8/2016 - 10/10/2016, 10/15/2016 - 10/16/2016");
    });
    it('returns non-contiguous ranges', function () {
        var template = handlebars_1.compile("{{date-ranges dates}}");
        var values = [
            '2017-07-08',
            '2017-07-11',
            '2017-09-10',
            '2017-09-11',
            '2017-11-16'
        ];
        var actual = template({ dates: values });
        chai_1.assert.strictEqual(actual, "7/8/2017, 7/11/2017, 9/10/2017 - 9/11/2017, 11/16/2017");
    });
    it('returns with custom seperator', function () {
        var template = handlebars_1.compile("{{date-ranges dates ' | '}}");
        var values = [
            '2017-07-08',
            '2017-07-11',
            '2017-09-10',
            '2017-09-11',
            '2017-11-16'
        ];
        var actual = template({ dates: values });
        chai_1.assert.strictEqual(actual, "7/8/2017 | 7/11/2017 | 9/10/2017 - 9/11/2017 | 11/16/2017");
    });
    it('returns with custom date format', function () {
        var template = handlebars_1.compile("{{date-ranges dates ', ' 'MMM D YYYY'}}");
        var values = [
            '2018-02-01',
            '2018-01-31'
        ];
        var actual = template({ dates: values });
        chai_1.assert.strictEqual(actual, "Jan 31 2018 - Feb 1 2018");
    });
    it('returns with custom culture', function () {
        var template = handlebars_1.compile("{{date-ranges dates ', ' 'L' 'en-gb'}}");
        var values = [
            '2018-02-01',
            '2018-01-31'
        ];
        var actual = template({ dates: values });
        chai_1.assert.strictEqual(actual, "31/01/2018 - 01/02/2018");
    });
});
