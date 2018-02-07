"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = require("handlebars");
var moment = require("moment");
require("twix");
exports.IsoDate = 'YYYY-MM-DD';
exports.IsoDateTime = 'YYYY-MM-DDThh:mm:ss';
function formatAllDay(date, locale) {
    var value = moment(date, exports.IsoDate).locale(locale);
    var result = value.format("L");
    return result;
}
function formatRange(date, startTime, endTime, locale) {
    var start = moment(date + "T" + startTime).locale(locale);
    var end = moment(date + "T" + endTime).locale(locale);
    var range = start.twix(end);
    var result = range.format();
    return result;
}
function optionalDateTimeHelper(value, locale) {
    if (value == null)
        return "";
    if (typeof locale != "string")
        locale = "en-US";
    var result = value.isAllDay
        ? formatAllDay(value.date, locale)
        : formatRange(value.date, value.startTime, value.endTime, locale);
    return new handlebars_1.SafeString(result);
}
exports.optionalDateTimeHelper = optionalDateTimeHelper;
