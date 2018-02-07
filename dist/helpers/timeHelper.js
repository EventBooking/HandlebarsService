"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = require("handlebars");
var moment = require("moment");
exports.IsoTime = 'hh:mm:ss';
function timeHelper(value, pattern, locale) {
    if (value == null)
        return "";
    if (typeof pattern != "string" || pattern.length == 0)
        pattern = "LT";
    if (typeof locale != "string")
        locale = "en-US";
    var date = moment(value, exports.IsoTime).locale(locale);
    var result = date.format(pattern);
    return new handlebars_1.SafeString(result);
}
exports.timeHelper = timeHelper;
