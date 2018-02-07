"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = require("handlebars");
function preHelper(data) {
    if (data == null)
        return "";
    var result = new handlebars_1.SafeString("<span class=\"prewrap\">" + data + "</span>");
    return result;
}
exports.preHelper = preHelper;
