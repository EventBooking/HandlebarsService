import "mocha";
import { assert } from "chai";
import { compile, registerHelper, unregisterHelper } from "handlebars";
import { preHelper } from "./preHelper";

describe('preHelper', () => {
    before(() => {
        registerHelper('pre', preHelper);
    });

    after(() => {
        unregisterHelper('pre');
    });

    it(`returns empty string for null`, () => {
        const template = compile(`{{pre value}}`);
        const actual = template({ value: null });
        assert.strictEqual(actual, '');
    });

    it('returns empty string if undefined', () => {
        const template = compile(`{{ pre value }}`);
        const actual = template({value: 'test'});
        assert.strictEqual(actual, `<span class="prewrap">test</span>`);
    });
});