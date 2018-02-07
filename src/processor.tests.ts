import "mocha";
import { assert } from "chai";
import * as sinon from "sinon";
import * as handlebars from "handlebars";
import * as invalidCharacterPreprocessor from "../src/preprocessors/invalidCharacterPreprocessor";
import * as listPreprocessor from "../src/preprocessors/listPreprocessor";
import * as tableRowPreprocessor from "../src/preprocessors/tableRowPreprocessor";
import { process } from "./processor";

describe('processor', function () {
    it('can process html and data', () => {
        const html = '{{#each values}}{{this}}{{/each}}';
        const actual = process(html, { values: [1, 2, 3, 4] });
        assert.strictEqual(actual, "1234");
    });

    describe('preprocessors', function () {
        const preProcessors: { [name: string]: any } = {
            "invalidCharacterPreprocessor": invalidCharacterPreprocessor,
            "listPreprocessor": listPreprocessor,
            "tableRowPreprocessor": tableRowPreprocessor
        };

        let stubCompile: sinon.SinonStub;
        let stubProcessors: sinon.SinonStub[];
        beforeEach(() => {
            stubCompile = sinon.stub(handlebars, 'compile').returns(() => "");
            stubProcessors = Object.keys(preProcessors).map(x => sinon.stub(preProcessors[x], x).returns(() => ""));
        });

        afterEach(() => {
            stubCompile.restore();
            stubProcessors.forEach(x => x.restore());
        });

        Object.keys(preProcessors).forEach((name, index) => {
            it(`can process ${name}`, () => {
                process("", {});
                assert.isTrue(stubProcessors[index].calledOnce);
            });
        });
    })

    describe('helpers', () => {
        const names = [
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

        let stubCompile: sinon.SinonStub;
        let helpers: { [name: string]: Function };
        beforeEach(() => {
            stubCompile = sinon.stub(handlebars, 'compile').returns((data: any, runtimeOptions: RuntimeOptions) => {
                if (runtimeOptions != null && runtimeOptions.helpers != null)
                    helpers = runtimeOptions.helpers;
            });
            process("", {});
        });
        afterEach(() => stubCompile.restore());

        names.forEach((name) => {
            it(`can process ${name}`, () => assert.isTrue(name in helpers))
        });
    });

});