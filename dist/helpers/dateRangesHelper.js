"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
require("twix");
exports.IsoDate = 'YYYY-MM-DD';
function distinctDates(date, idx, array) {
    return array.indexOf(date) === idx;
}
function isContiguosDate(prev, curr) {
    var result = moment(curr, exports.IsoDate).diff(moment(prev, exports.IsoDate), 'd') === 1;
    return result;
}
exports.isContiguosDate = isContiguosDate;
function formatRange(range, pattern, locale) {
    if (typeof pattern !== "string" || pattern.length == 0)
        pattern = "l";
    if (typeof locale !== "string")
        locale = "en-US";
    var start = moment(range[0], exports.IsoDate).locale(locale);
    if (range.length == 1) {
        return start.format(pattern);
    }
    else {
        var end = moment(range[range.length - 1], exports.IsoDate).locale(locale);
        return start.format(pattern) + " - " + end.format(pattern);
    }
}
function dateRangesHelper(dates, separator, pattern, locale) {
    if (dates == null)
        return "";
    if (typeof separator !== "string")
        separator = ", ";
    var orderedDates = dates
        .sort()
        .filter(distinctDates);
    var ranges = [];
    var current = [orderedDates[0]];
    for (var i = 1; i < orderedDates.length; i++) {
        var currentLast = current[current.length - 1];
        var date = orderedDates[i];
        if (isContiguosDate(currentLast, date)) {
            current.push(date);
        }
        else {
            ranges.push(current);
            current = [date];
        }
    }
    ranges.push(current);
    var results = ranges
        .map(function (range) { return formatRange(range, pattern, locale); })
        .join(separator);
    return results;
}
exports.dateRangesHelper = dateRangesHelper;
