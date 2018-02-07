"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = require("handlebars");
function flatMap(values) {
    var results = [];
    for (var i = 0; i < values.length; i++) {
        var value = values[i];
        if (value instanceof Array && typeof value !== "string")
            value.forEach(function (x) { return results.push(x); });
        else
            results.push(value);
    }
    return results;
}
function getValues(data) {
    var values = flatMap(data);
    return {
        pattern: values.pop() || ", ",
        data: values
    };
}
exports.getValues = getValues;
function format(pattern, data) {
    if (data.length == 0)
        return "";
    return data.join(pattern);
}
function joinHelper() {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i] = arguments[_i];
    }
    // pop off the options object
    data.pop();
    var values = getValues(data);
    var result = format(values.pattern, values.data);
    return new handlebars_1.SafeString(result);
}
exports.joinHelper = joinHelper;
function joinDistinctHelper() {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i] = arguments[_i];
    }
    // pop off the options object
    data.pop();
    var values = getValues(data);
    var distinct = values.data.filter(function (x, i) { return values.data.indexOf(x) == i; });
    var result = format(values.pattern, distinct);
    return new handlebars_1.SafeString(result);
}
exports.joinDistinctHelper = joinDistinctHelper;
