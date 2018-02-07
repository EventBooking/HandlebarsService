"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var listPreprocessor_1 = require("./listPreprocessor");
describe('listPreprocessor', function () {
    it("processes #list", function () {
        var html = "<li>{{#list items}}{{value}}{{/list}}</li>";
        var actual = listPreprocessor_1.listPreprocessor(html);
        var expected = "{{#each items}}<li>{{value}}</li>{{/each}}";
        chai_1.assert.strictEqual(actual, expected);
    });
    it("processes #list with dot notation", function () {
        var html = "<li>{{#list obj.items}}{{value}}{{/list}}</li>";
        var actual = listPreprocessor_1.listPreprocessor(html);
        var expected = "{{#each obj.items}}<li>{{value}}</li>{{/each}}";
        chai_1.assert.strictEqual(actual, expected);
    });
});
