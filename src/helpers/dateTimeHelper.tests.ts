import "mocha";
import { assert } from "chai";
import { compile, registerHelper, unregisterHelper } from "handlebars";
import { dateTimeHelper } from "./dateTimeHelper";

describe('dateTimeHelper', () => {
    before(() => {
        registerHelper('datetime', dateTimeHelper);
    });

    after(() => {
        unregisterHelper('datetime');
    });

    it(`returns empty string for null`, () => {
        const template = compile(`{{datetime value}}`);
        const actual = template({ value: null });
        assert.strictEqual(actual, '');
    });

    it(`returns datetime`, () => {
        const template = compile(`{{datetime value}}`);
        const actual = template({ value: '2015-12-25T18:25:00' });
        assert.strictEqual(actual, `12/25/2015 6:25 PM`);
    });

    it(`returns datetime for pattern`, () => {
        const template = compile(`{{datetime value 'MMM D, YYYY h:mm A'}}`);
        const actual = template({ value: '2015-12-25T18:25:00' });
        assert.strictEqual(actual, `Dec 25, 2015 6:25 PM`);
    });

    it(`returns datetime for pattern and locale`, () => {
        const template = compile(`{{datetime value 'L LT' 'en-GB'}}`);
        const actual = template({ value: '2015-12-25T18:25:00' });
        assert.strictEqual(actual, `25/12/2015 18:25`);
    });
});