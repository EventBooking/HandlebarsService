import "mocha";
import { assert } from "chai";
import { compile, registerHelper, unregisterHelper } from "handlebars";
import { timeHelper } from "./timeHelper";

describe('timeHelper', () => {
    before(() => {
        registerHelper('time', timeHelper);
    });

    after(() => {
        unregisterHelper('time');
    });

    it(`returns empty string for null`, () => {
        const template = compile(`{{time value}}`);
        const actual = template({ value: null });
        assert.strictEqual(actual, '');
    });

    it(`returns time`, () => {
        const template = compile(`{{time value}}`);
        const actual = template({ value: '18:25:00' });
        assert.strictEqual(actual, `6:25 PM`);
    });

    it(`returns time for pattern`, () => {
        const template = compile(`{{time value 'h:mm A'}}`);
        const actual = template({ value: '18:25:00' });
        assert.strictEqual(actual, `6:25 PM`);
    });

    it(`returns time for pattern and locale`, () => {
        const template = compile(`{{time value 'LT' 'en-GB'}}`);
        const actual = template({ value: '18:25:00' });
        assert.strictEqual(actual, `18:25`);
    });
});