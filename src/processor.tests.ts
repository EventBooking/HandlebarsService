import "mocha";
import { assert } from "chai";
import { process } from "./processor";
import { helpers } from "handlebars";

describe('processor', () => {
    it('can process html and data', () => {
        const html = '{{#each values}}{{this}}{{/each}}';
        const actual = process(html, { values: [1, 2, 3, 4] });
        assert.strictEqual(actual, "1234");
    });

    const helperNames = [
        "number",
        "in",
        "notin",
        "money",
        "join",
        "join-distinct"
    ];

    helperNames.forEach((name) => {
        it(`can process ${name}`, () => name in helpers);
});

});