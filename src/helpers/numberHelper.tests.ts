import "mocha";
import { assert } from "chai";
import { registerHelper, compile } from "handlebars";
import { numberHelper } from "./numberHelper";

describe('numberHelper', () => {
    registerHelper('number', numberHelper);

    it('returns number', () => {
        const html = `{{ number 1234 }}`;
        const template = compile(html);
        const actual = template(1234);
        assert.strictEqual(actual, "1234");
    });

    it('returns empty string if undefined', () => {
        const html = `{{ number value }}`;
        const template = compile(html);
        const actual = template({});
        assert.strictEqual(actual, "");
    });

    it('returns empty string if null', () => {
        const html = `{{ number value }}`;
        const template = compile(html);
        const actual = template({ value: null });
        console.log(JSON.stringify(actual));
        assert.strictEqual(actual, "");
    });

    it('trims off zeros', () => {
        const html = `{{ number value }}`;
        const template = compile(html);
        const actual = template({ value: 123.4000 });
        console.log(JSON.stringify(actual));
        assert.strictEqual(actual, "123.4");
    });

    it('trims off zeros for strings', () => {
        const html = `{{ number value }}`;
        const template = compile(html);
        const actual = template({ value: "123.4000" });
        console.log(JSON.stringify(actual));
        assert.strictEqual(actual, "123.4");
    });
});