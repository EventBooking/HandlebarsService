"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = require("handlebars");
var True = new handlebars_1.SafeString("true");
var False = new handlebars_1.SafeString("false");
function _in(data, values) {
    if (data == null || values == null)
        return false;
    if (!(values instanceof Array))
        values = [values];
    return values.indexOf(data) > -1;
}
function inHelper(data, values) {
    return _in(data, values) ? True : False;
}
exports.inHelper = inHelper;
function notInHelper(data, values) {
    return _in(data, values) ? False : True;
}
exports.notInHelper = notInHelper;
