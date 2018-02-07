"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = require("handlebars");
// helpers
var dateHelper_1 = require("./helpers/dateHelper");
var dateTimeHelper_1 = require("./helpers/dateTimeHelper");
var inHelper_1 = require("./helpers/inHelper");
var joinHelper_1 = require("./helpers/joinHelper");
var moneyHelper_1 = require("./helpers/moneyHelper");
var numberHelper_1 = require("./helpers/numberHelper");
var optionalDateTimeHelper_1 = require("./helpers/optionalDateTimeHelper");
var timeHelper_1 = require("./helpers/timeHelper");
var dateRangesHelper_1 = require("./helpers/dateRangesHelper");
var preHelper_1 = require("./helpers/preHelper");
// preprocessors
var invalidCharacterPreprocessor_1 = require("./preprocessors/invalidCharacterPreprocessor");
var listPreprocessor_1 = require("./preprocessors/listPreprocessor");
var tableRowPreprocessor_1 = require("./preprocessors/tableRowPreprocessor");
function preprocess(html) {
    var result = [
        invalidCharacterPreprocessor_1.invalidCharacterPreprocessor,
        listPreprocessor_1.listPreprocessor,
        tableRowPreprocessor_1.tableRowPreprocessor
    ].reduce(function (html, fn) { return fn(html); }, html);
    return result;
}
function process(html, data) {
    var processedHtml = preprocess(html);
    var template = handlebars_1.compile(processedHtml);
    var result = template(data, {
        helpers: {
            "date": dateHelper_1.dateHelper,
            "datetime": dateTimeHelper_1.dateTimeHelper,
            "in": inHelper_1.inHelper, "notin": inHelper_1.notInHelper,
            "join": joinHelper_1.joinHelper, "join-distinct": joinHelper_1.joinDistinctHelper,
            "money": moneyHelper_1.moneyHelper,
            "number": numberHelper_1.numberHelper,
            "optionaldatetime": optionalDateTimeHelper_1.optionalDateTimeHelper,
            "time": timeHelper_1.timeHelper,
            "date-ranges": dateRangesHelper_1.dateRangesHelper,
            "pre": preHelper_1.preHelper
        }
    });
    return result;
}
exports.process = process;
;
