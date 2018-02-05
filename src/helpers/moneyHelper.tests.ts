import "mocha";
import { assert } from "chai";
import { compile, registerHelper } from "handlebars";
import { moneyHelper, MoneyLike } from "./moneyHelper";

describe('moneyHelper', () => {
    registerHelper('money', moneyHelper);

    it(`returns money`, () => {
        const template = compile(`{{money value}}`);
        const value = {
            amount: 120000.25,
            currency: "USD"
        } as MoneyLike;
        const actual = template({ value: value });
        assert.strictEqual(actual, `$120,000.25`);
    });

    it(`returns money other currencies`, () => {
        const template = compile(`{{money value}}`);
        const value = {
            amount: 120000.25,
            currency: "GBP"
        } as MoneyLike;
        const actual = template({ value: value });
        assert.strictEqual(actual, `£120,000.25`);
    });

    it(`defaults currency to USD`, () => {
        const template = compile(`{{money value}}`);
        const value = {
            amount: 120000.25
        } as MoneyLike;
        const actual = template({ value: value });
        assert.strictEqual(actual, `$120,000.25`);
    });

    it(`returns money with currency`, () => {
        const template = compile(`{{money value 'c'}}`);
        const value = {
            amount: 120000.25,
            currency: "GBP"
        } as MoneyLike;
        const actual = template({ value: value });
        assert.strictEqual(actual, `£120,000.25 GBP`);
    });
});