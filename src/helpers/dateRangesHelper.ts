import * as moment from "moment";
import "twix";

export const IsoDate = 'YYYY-MM-DD';

function distinctDates(date: string, idx: number, array: string[]) {
    return array.indexOf(date) === idx;
}

export function isContiguosDate(prev: string, curr: string): boolean {
    const result = moment(curr, IsoDate).diff(moment(prev, IsoDate), 'd') === 1;
    return result;
}

function formatRange(range: string[], pattern: string, locale: string): string {
    if (typeof pattern !== "string" || pattern.length == 0)
        pattern = "l";
    if (typeof locale !== "string")
        locale = "en-US";

    const start = moment(range[0], IsoDate).locale(locale);

    if (range.length == 1) {
        return start.format(pattern);
    } else {
        const end = moment(range[range.length - 1], IsoDate).locale(locale);
        return `${start.format(pattern)} - ${end.format(pattern)}`;
    }
}

export function dateRangesHelper(dates: string[], separator: string, pattern: string, locale: string) {
    if (dates == null)
        return "";
    if (typeof separator !== "string")
        separator = ", ";

    let orderedDates = dates
        .sort()
        .filter(distinctDates);

    let ranges: string[][] = [];
    let current: string[] = [orderedDates[0]];
    for (let i = 1; i < orderedDates.length; i++) {
        const currentLast = current[current.length - 1];
        const date = orderedDates[i];
        if (isContiguosDate(currentLast, date)) {
            current.push(date);
        } else {
            ranges.push(current);
            current = [date];
        }
    }
    ranges.push(current);

    const results = ranges
        .map(range => formatRange(range, pattern, locale))
        .join(separator);

    return results;
}