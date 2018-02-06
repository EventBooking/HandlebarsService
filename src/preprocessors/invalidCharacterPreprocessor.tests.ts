import "mocha";
import { assert } from "chai";
import { compile, registerHelper, unregisterHelper } from "handlebars";
import { invalidCharacterPreprocessor } from "./invalidCharacterPreprocessor";

describe('invalidCharacterPreprocessor', () => {
    const values: { [index: string]: string } = {
        "\u2018": "'",
        "\u2019": "'",
        "\u201C": '"',
        "\u201D": '"'
    }

    Object.keys(values).forEach(key => {
        const expected = values[key];
        it(`returns ${expected} for ${key}`, () => {
            const actual = invalidCharacterPreprocessor(key);
            assert.strictEqual(actual, expected);
        });
    });

});