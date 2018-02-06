import "mocha";
import { assert } from "chai";
import { compile, registerHelper, unregisterHelper } from "handlebars";
import { inHelper, notInHelper } from "./inHelper";

describe('inHelper', () => {
    before(() => {
        registerHelper('in', inHelper);
    });

    after(() => {
        unregisterHelper('in');
    });

    it('returns false when no property', () => {
        const template = compile(`{{in}}`);
        const actual = template({});
        assert.strictEqual(actual, "false");
    });

    it('returns false when no value', () => {
        const template = compile(`{{in value}}`);
        const actual = template({ value: "foo" });
        assert.strictEqual(actual, "false");
    });

    it('returns false when not equal', () => {
        const template = compile(`{{in value 'foo1'}}`);
        const actual = template({ value: "foo" });
        assert.strictEqual(actual, "false");
    });

    it('returns true when equal', () => {
        const template = compile(`{{in value 'foo'}}`);
        const actual = template({ value: "foo" });
        assert.strictEqual(actual, "true");
    });

    it('returns true when matching any value', () => {
        const template = compile(`{{in value values}}`);
        const actual = template({ value: "foo", values: ["foo", "bar"] });
        assert.strictEqual(actual, "true");
    });
});

describe('notInHelper', () => {
    before(() => {
        registerHelper('notin', notInHelper);
    });

    after(() => {
        unregisterHelper('notin');
    });

    it('returns true when not matching any value', () => {
        const template = compile(`{{notin value values}}`);
        const actual = template({ value: "foo", values: ["bar", "baz"] });
        assert.strictEqual(actual, "true");
    });

    it('returns false when matching any value', () => {
        const template = compile(`{{notin value values}}`);
        const actual = template({ value: "foo", values: ["foo", "bar"] });
        assert.strictEqual(actual, "false");
    });
});