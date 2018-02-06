import { SafeString, Utils } from "handlebars";
import * as moment from "moment";
import "twix";
import { TwixFormatOptions } from "twix";

export const IsoDate = 'YYYY-MM-DD';
export const IsoDateTime = 'YYYY-MM-DDThh:mm:ss';

export type OptionalDateTimeLike = {
    date: string,
    isAllDay: boolean,
    startTime?: string,
    endTime?: string
};

function formatAllDay(date: string, locale: string): string {
    const value = moment(date, IsoDate).locale(locale);
    const result = value.format("L");
    return result;
}

function formatRange(date: string, startTime: string, endTime: string, locale: string): string {
    const start = moment(`${date}T${startTime}`).locale(locale);
    const end = moment(`${date}T${endTime}`).locale(locale);
    const range = start.twix(end);
    const result = range.format();
    return result;
}

export function optionalDateTimeHelper(value: OptionalDateTimeLike, locale?: string) {
    if (value == null)
        return "";

    if (typeof locale != "string")
        locale = "en-US";

    const result = value.isAllDay
        ? formatAllDay(value.date, locale)
        : formatRange(value.date, value.startTime!, value.endTime!, locale);

    return new SafeString(result);
}