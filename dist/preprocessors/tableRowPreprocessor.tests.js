"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var tableRowPreprocessor_1 = require("./tableRowPreprocessor");
describe('tableRowPreprocessor', function () {
    it("processes #tablerow", function () {
        var html = "<tbody><tr><td>{{#tablerow items}}{{value1}}</td><td>{{value2}}</td><td>{{value3}}{{/tablerow}}</td></tr></tbody>";
        var actual = tableRowPreprocessor_1.tableRowPreprocessor(html);
        var expected = "<tbody>{{#each items}}<tr><td>{{value1}}</td><td>{{value2}}</td><td>{{value3}}</td></tr>{{/each}}</tbody>";
        chai_1.assert.strictEqual(actual, expected);
    });
    it("processes #tablerow with dot notation", function () {
        var html = "<tbody><tr><td>{{#tablerow value.items}}{{value1}}</td><td>{{value2}}</td><td>{{value3}}{{/tablerow}}</td></tr></tbody>";
        var actual = tableRowPreprocessor_1.tableRowPreprocessor(html);
        var expected = "<tbody>{{#each value.items}}<tr><td>{{value1}}</td><td>{{value2}}</td><td>{{value3}}</td></tr>{{/each}}</tbody>";
        chai_1.assert.strictEqual(actual, expected);
    });
});
