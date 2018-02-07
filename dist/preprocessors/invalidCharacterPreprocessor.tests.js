"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var invalidCharacterPreprocessor_1 = require("./invalidCharacterPreprocessor");
describe('invalidCharacterPreprocessor', function () {
    var values = {
        "\u2018": "'",
        "\u2019": "'",
        "\u201C": '"',
        "\u201D": '"'
    };
    Object.keys(values).forEach(function (key) {
        var expected = values[key];
        it("returns " + expected + " for " + key, function () {
            var actual = invalidCharacterPreprocessor_1.invalidCharacterPreprocessor(key);
            chai_1.assert.strictEqual(actual, expected);
        });
    });
});
