import "mocha";
import { assert } from "chai";
import { compile, registerHelper, unregisterHelper } from "handlebars";
import { tableRowPreprocessor } from "./tableRowPreprocessor";

describe('tableRowPreprocessor', () => {
    
    it(`processes #tablerow`, () => {
        const html = "<tbody><tr><td>{{#tablerow items}}{{value1}}</td><td>{{value2}}</td><td>{{value3}}{{/tablerow}}</td></tr></tbody>";
        const actual = tableRowPreprocessor(html);
        const expected = "<tbody>{{#each items}}<tr><td>{{value1}}</td><td>{{value2}}</td><td>{{value3}}</td></tr>{{/each}}</tbody>";
        assert.strictEqual(actual, expected);
    });

    it(`processes #tablerow with dot notation`, () => {
        const html = "<tbody><tr><td>{{#tablerow value.items}}{{value1}}</td><td>{{value2}}</td><td>{{value3}}{{/tablerow}}</td></tr></tbody>";
        const actual = tableRowPreprocessor(html);
        const expected = "<tbody>{{#each value.items}}<tr><td>{{value1}}</td><td>{{value2}}</td><td>{{value3}}</td></tr>{{/each}}</tbody>";
        assert.strictEqual(actual, expected);
    });

});