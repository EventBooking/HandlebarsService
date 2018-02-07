"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = require("handlebars");
/*
    Removes trailing zeros from a number
*/
function numberHelper(data) {
    if (data == null)
        return "";
    if (typeof data == "string")
        data = +data;
    return new handlebars_1.SafeString(data.toString());
}
exports.numberHelper = numberHelper;
