"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var handlebars_1 = require("handlebars");
var moneyHelper_1 = require("./moneyHelper");
describe('moneyHelper', function () {
    before(function () {
        handlebars_1.registerHelper('money', moneyHelper_1.moneyHelper);
    });
    after(function () {
        handlebars_1.unregisterHelper('money');
    });
    it("returns money", function () {
        var template = handlebars_1.compile("{{money value}}");
        var value = {
            amount: 120000.25,
            currency: "USD"
        };
        var actual = template({ value: value });
        chai_1.assert.strictEqual(actual, "$120,000.25");
    });
    it("returns money other currencies", function () {
        var template = handlebars_1.compile("{{money value}}");
        var value = {
            amount: 120000.25,
            currency: "GBP"
        };
        var actual = template({ value: value });
        chai_1.assert.strictEqual(actual, "\u00A3120,000.25");
    });
    it("defaults currency to USD", function () {
        var template = handlebars_1.compile("{{money value}}");
        var value = {
            amount: 120000.25
        };
        var actual = template({ value: value });
        chai_1.assert.strictEqual(actual, "$120,000.25");
    });
    it("returns money with currency", function () {
        var template = handlebars_1.compile("{{money value 'c'}}");
        var value = {
            amount: 120000.25,
            currency: "GBP"
        };
        var actual = template({ value: value });
        chai_1.assert.strictEqual(actual, "\u00A3120,000.25 GBP");
    });
});
