import "mocha";
import { assert } from "chai";
import { compile, registerHelper } from "handlebars";
import { getValues, joinHelper, joinDistinctHelper } from "./joinHelper";

describe('getValues', () => {
    it(`returns empty values`, () => {
        const result = getValues([]);
        assert.strictEqual(result.pattern, ', ');
        assert.strictEqual(result.data.length, 0);
    });

    it(`returns values`, () => {
        const result = getValues(['foo', ', ']);
        assert.strictEqual(result.pattern, ', ');

        const [value1] = result.data;
        assert.strictEqual(value1, 'foo');
    });

    it(`returns values for array`, () => {
        const result = getValues([['foo', 'bar'], ', ']);
        assert.strictEqual(result.pattern, ', ');

        const [value1, value2] = result.data;
        assert.strictEqual(value1, 'foo');
        assert.strictEqual(value2, 'bar');
    });
});

describe('joinHelper', () => {
    registerHelper('join', joinHelper);

    it(`returns empty when no arguments`, () => {
        const template = compile(`{{join}}`);
        const actual = template({});
        assert.strictEqual(actual, '');
    });

    it(`returns empty when no values`, () => {
        const template = compile(`{{join ', '}}`);
        const actual = template({});
        assert.strictEqual(actual, '');
    });

    it(`returns empty when single value`, () => {
        const template = compile(`{{join value ', '}}`);
        const actual = template({ value: "foo" });
        assert.strictEqual(actual, 'foo');
    });

    it(`returns joined array`, () => {
        const template = compile(`{{join values ', '}}`);
        const actual = template({ values: ["foo", "bar"] });
        assert.strictEqual(actual, 'foo, bar');
    });

    it(`returns joined array from multiple values`, () => {
        const template = compile(`{{join values ', '}}`);
        const actual = template({ values: ["foo", "bar"] });
        assert.strictEqual(actual, 'foo, bar');
    });

    it(`returns joined array from an array and value`, () => {
        const template = compile(`{{join value1 value2 ', '}}`);
        const actual = template({ value1: ["foo", "bar"], value2: "baz" });
        assert.strictEqual(actual, 'foo, bar, baz');
    });

    it(`returns joined array from multiple arrays`, () => {
        const template = compile(`{{join value1 value2 ', '}}`);
        const actual = template({ value1: ["foo", "bar"], value2: ["baz", "fiz"] });
        assert.strictEqual(actual, 'foo, bar, baz, fiz');
    });
});

describe('joinDinstictHelper', () => {
    registerHelper('join-distinct', joinDistinctHelper);

    it(`returns distinct list`, () => {
        const template = compile(`{{join-distinct list ', '}}`);
        const actual = template({ list: ["foo", "foo", "bar"] });
        assert.strictEqual(actual, 'foo, bar');
    });
});