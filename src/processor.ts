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

// preprocessors

type HelpersHash = { [name: string]: Function };
const helpers: HelpersHash = {
    "date": dateHelper,
    "datetime": dateTimeHelper,
    "in": inHelper, "notin": notInHelper,
    "join": joinHelper, "join-distinct": joinDistinctHelper,
    "money": moneyHelper,
    "number": numberHelper,
    "optionaldatetime": optionalDateTimeHelper,
    "time": timeHelper
};

type PreprocessorLike = (html: string) => string;
const preprocessors: PreprocessorLike[] = [

];

function preprocess(html: string) {
    const result = preprocessors.reduce((html, fn) => fn(html), html);
    return result;
}

export function process<T>(html: string, data: T): string {
    const processedHtml = preprocess(html);
    const template = compile(processedHtml);
    const result = template(data, {
        helpers: helpers
    });
    return result;
};