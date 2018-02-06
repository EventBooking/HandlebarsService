import "mocha";
import { assert } from "chai";
import { compile, registerHelper, unregisterHelper } from "handlebars";
import { optionalDateTimeHelper, OptionalDateTimeLike } from "./optionalDateTimeHelper";

describe('optionalDateTimeHelper', () => {
    before(() => {
        registerHelper('optionaldatetime', optionalDateTimeHelper);
    });

    after(() => {
        unregisterHelper('optionaldatetime');
    });

    it(`returns empty string for null`, () => {
        const template = compile(`{{optionaldatetime value}}`);
        const actual = template({ value: null });
        assert.strictEqual(actual, '');
    });

    it(`returns datetime`, () => {
        const template = compile(`{{optionaldatetime value}}`);
        const value = { 
            date: '2015-12-25',
            isAllDay: true
        } as OptionalDateTimeLike;
        const actual = template({value: value});
        assert.strictEqual(actual, `12/25/2015`);
    });

    it(`returns datetime with start and end`, () => {
        const template = compile(`{{optionaldatetime value}}`);
        const value = { 
            date: '2015-12-25',
            isAllDay: false,
            startTime: '08:00:00',
            endTime: '17:00:00'
        } as OptionalDateTimeLike;
        const actual = template({value: value});
        assert.strictEqual(actual, `Dec 25, 2015, 8 AM - 5 PM`);
    });

    it(`returns datetime for locale`, () => {
        const template = compile(`{{optionaldatetime value 'en-GB'}}`);
        const value = { 
            date: '2015-12-25',
            isAllDay: true
        } as OptionalDateTimeLike;
        const actual = template({value: value});
        assert.strictEqual(actual, `25/12/2015`);
    });
});