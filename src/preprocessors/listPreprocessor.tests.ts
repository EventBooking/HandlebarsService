import "mocha";
import { assert } from "chai";
import { compile, registerHelper, unregisterHelper } from "handlebars";
import { listPreprocessor } from "./listPreprocessor";

describe('listPreprocessor', () => {
    
    it(`processes #list`, () => {
        const html = "<li>{{#list items}}{{value}}{{/list}}</li>";
        const actual = listPreprocessor(html);
        const expected = "{{#each items}}<li>{{value}}</li>{{/each}}";
        assert.strictEqual(actual, expected);
    });

    it(`processes #list with dot notation`, () => {
        const html = "<li>{{#list obj.items}}{{value}}{{/list}}</li>";
        const actual = listPreprocessor(html);
        const expected = "{{#each obj.items}}<li>{{value}}</li>{{/each}}";
        assert.strictEqual(actual, expected);
    });

});