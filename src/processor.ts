import { compile } from "handlebars";

// helpers
import { dateHelper } from "./helpers/dateHelper";
import { dateTimeHelper } from "./helpers/dateTimeHelper";
import { inHelper, notInHelper } from "./helpers/inHelper";
import { joinHelper, joinDistinctHelper } from "./helpers/joinHelper";
import { moneyHelper } from "./helpers/moneyHelper";
import { numberHelper } from "./helpers/numberHelper";
import { optionalDateTimeHelper } from "./helpers/optionalDateTimeHelper";
import { timeHelper } from "./helpers/timeHelper";
import { dateRangesHelper } from "./helpers/dateRangesHelper";
import { preHelper } from "./helpers/preHelper";

// preprocessors
import { invalidCharacterPreprocessor } from "./preprocessors/invalidCharacterPreprocessor";
import { listPreprocessor } from "./preprocessors/listPreprocessor";
import { tableRowPreprocessor } from "./preprocessors/tableRowPreprocessor";

function preprocess(html: string) {
    const result = [
        invalidCharacterPreprocessor,
        listPreprocessor,
        tableRowPreprocessor
    ].reduce((html, fn) => fn(html), html);
    return result;
}

export function process<T>(html: string, data: T): string {
    const processedHtml = preprocess(html);
    const template = compile(processedHtml);
    const result = template(data, {
        helpers: {
            "date": dateHelper,
            "datetime": dateTimeHelper,
            "in": inHelper, "notin": notInHelper,
            "join": joinHelper, "join-distinct": joinDistinctHelper,
            "money": moneyHelper,
            "number": numberHelper,
            "optionaldatetime": optionalDateTimeHelper,
            "time": timeHelper,
            "date-ranges": dateRangesHelper,
            "pre": preHelper
        }
    });
    return result;
};