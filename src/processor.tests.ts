import "mocha";
import { assert } from "chai";
import * as sinon from "sinon";
import { process } from "./processor";
import * as handlebars from "handlebars";

describe('processor', () => {
    it('can process html and data', () => {
        const html = '{{#each values}}{{this}}{{/each}}';
        const actual = process(html, { values: [1, 2, 3, 4] });
        assert.strictEqual(actual, "1234");
    });

    describe('processor.helpers', () => {
        const helperNames = [
            "date",
            "datetime",
            "in", "notin",
            "join", "join-distinct",
            "money",
            "number",
            "optionaldatetime",
            "time",
            "date-ranges",
            "pre"
        ];

        let mockHandlebars: sinon.SinonMock;
        before(() => mockHandlebars = sinon.mock(handlebars));
        after(() => mockHandlebars.restore());

        helperNames.forEach((name) => {
            it(`can process ${name}`, () => {
                let isFound = false;

                mockHandlebars
                    .expects('compile')
                    .returns((data: any, runtimeOptions: RuntimeOptions) => {
                        isFound = name in runtimeOptions.helpers!;
                    })

                process("", {});
                assert.isTrue(isFound);
            });
        });
    })

});