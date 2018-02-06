import { SafeString, Utils } from "handlebars";
import * as moment from "moment";

export const IsoDate = 'YYYY-MM-DD';

export function dateHelper(value: string, pattern?: string, locale?: string) {
    if (value == null)
        return "";
    if (typeof pattern != "string" || pattern.length == 0)
        pattern = "L";
    if (typeof locale != "string")
        locale = "en-US";
    
    const date = moment(value, IsoDate).locale(locale);
    const result = date.format(pattern);
    return new SafeString(result);
}