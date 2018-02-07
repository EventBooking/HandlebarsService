"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var sinon = require("sinon");
var handlebars = require("handlebars");
var invalidCharacterPreprocessor = require("../src/preprocessors/invalidCharacterPreprocessor");
var listPreprocessor = require("../src/preprocessors/listPreprocessor");
var tableRowPreprocessor = require("../src/preprocessors/tableRowPreprocessor");
var processor_1 = require("./processor");
describe('processor', function () {
    it('can process html and data', function () {
        var html = '{{#each values}}{{this}}{{/each}}';
        var actual = processor_1.process(html, { values: [1, 2, 3, 4] });
        chai_1.assert.strictEqual(actual, "1234");
    });
    describe('preprocessors', function () {
        var preProcessors = {
            "invalidCharacterPreprocessor": invalidCharacterPreprocessor,
            "listPreprocessor": listPreprocessor,
            "tableRowPreprocessor": tableRowPreprocessor
        };
        var stubCompile;
        var stubProcessors;
        beforeEach(function () {
            stubCompile = sinon.stub(handlebars, 'compile').returns(function () { return ""; });
            stubProcessors = Object.keys(preProcessors).map(function (x) { return sinon.stub(preProcessors[x], x).returns(function () { return ""; }); });
        });
        afterEach(function () {
            stubCompile.restore();
            stubProcessors.forEach(function (x) { return x.restore(); });
        });
        Object.keys(preProcessors).forEach(function (name, index) {
            it("can process " + name, function () {
                processor_1.process("", {});
                chai_1.assert.isTrue(stubProcessors[index].calledOnce);
            });
        });
    });
    describe('helpers', function () {
        var names = [
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
        var stubCompile;
        var helpers;
        beforeEach(function () {
            stubCompile = sinon.stub(handlebars, 'compile').returns(function (data, runtimeOptions) {
                if (runtimeOptions != null && runtimeOptions.helpers != null)
                    helpers = runtimeOptions.helpers;
            });
            processor_1.process("", {});
        });
        afterEach(function () { return stubCompile.restore(); });
        names.forEach(function (name) {
            it("can process " + name, function () { return chai_1.assert.isTrue(name in helpers); });
        });
    });
});
