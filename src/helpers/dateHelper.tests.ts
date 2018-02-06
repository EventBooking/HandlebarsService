import "mocha";
import { assert } from "chai";
import { compile, registerHelper, unregisterHelper } from "handlebars";
import { dateHelper } from "./dateHelper";

describe('dateHelper', () => {
    before(() => {
        registerHelper('date', dateHelper);
    });

    after(() => {
        unregisterHelper('date');
    });

    it(`returns empty string for null`, () => {
        const template = compile(`{{date value}}`);
        const actual = template({ value: null });
        assert.strictEqual(actual, '');
    });

    it(`returns date`, () => {
        const template = compile(`{{date value}}`);
        const actual = template({ value: '2015-12-25' });
        assert.strictEqual(actual, `12/25/2015`);
    });

    it(`returns date for pattern`, () => {
        const template = compile(`{{date value 'MMM D, YYYY'}}`);
        const actual = template({ value: '2015-12-25' });
        assert.strictEqual(actual, `Dec 25, 2015`);
    });

    it(`returns date for pattern and locale`, () => {
        const template = compile(`{{date value 'L' 'en-GB'}}`);
        const actual = template({ value: '2015-12-25' });
        assert.strictEqual(actual, `25/12/2015`);
    });
});