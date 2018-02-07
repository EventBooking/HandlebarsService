"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = require("handlebars");
var moment = require("moment");
exports.IsoDate = 'YYYY-MM-DD';
function dateHelper(value, pattern, locale) {
    if (value == null)
        return "";
    if (typeof pattern != "string" || pattern.length == 0)
        pattern = "L";
    if (typeof locale != "string")
        locale = "en-US";
    var date = moment(value, exports.IsoDate).locale(locale);
    var result = date.format(pattern);
    return new handlebars_1.SafeString(result);
}
exports.dateHelper = dateHelper;
