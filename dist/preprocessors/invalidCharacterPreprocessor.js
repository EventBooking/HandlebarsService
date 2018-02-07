"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function replaceWithTick(html) {
    var result = html.replace(/\u2018|\u2019/g, "'");
    return result;
}
function replaceWithQuote(html) {
    var result = html.replace(/\u201C|\u201D/g, "\"");
    return result;
}
var replaceFunctions = [
    replaceWithTick,
    replaceWithQuote
];
function invalidCharacterPreprocessor(html) {
    var results = replaceFunctions.reduce(function (html, fn) { return fn(html); }, html);
    return results;
}
exports.invalidCharacterPreprocessor = invalidCharacterPreprocessor;
