import { SafeString, Utils } from "handlebars";
import * as moment from "moment";

export const IsoTime = 'hh:mm:ss';

export function timeHelper(value: string, pattern?: string, locale?: string) {
    if (value == null)
        return "";
    if (typeof pattern != "string" || pattern.length == 0)
        pattern = "LT";
    if (typeof locale != "string")
        locale = "en-US";
    
    const date = moment(value, IsoTime).locale(locale);
    const result = date.format(pattern);
    return new SafeString(result);
}