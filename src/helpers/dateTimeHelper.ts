import { SafeString, Utils } from "handlebars";
import * as moment from "moment";

export const IsoDateTime = 'YYYY-MM-DDThh:mm:ss';

export function dateTimeHelper(value: string, pattern?: string, locale?: string) {
    if (value == null)
        return "";
    if (typeof pattern != "string" || pattern.length == 0)
        pattern = "L LT";
    if (typeof locale != "string")
        locale = "en-US";
    
    const date = moment(value, IsoDateTime).locale(locale);
    const result = date.format(pattern);
    return new SafeString(result);
}