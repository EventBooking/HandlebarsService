"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = require("handlebars");
var currency_formatter_1 = require("currency-formatter");
function formatPattern(value, currency, pattern) {
    switch (pattern) {
        case 'c':
            return value + " " + currency;
        default:
            return value;
    }
}
function moneyHelper(data, pattern) {
    var currency = data.currency || "USD";
    var value = currency_formatter_1.format(data.amount, { code: currency });
    var result = formatPattern(value, currency, pattern);
    return new handlebars_1.SafeString(result);
}
exports.moneyHelper = moneyHelper;
