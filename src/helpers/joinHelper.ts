import { SafeString, Utils } from "handlebars";

interface IJoinValues {
    pattern: string;
    data: any[];
}

function flatMap(values: any[]): any[] {
    let results: any[] = [];
    for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (value instanceof Array && typeof value !== "string")
            value.forEach(x => results.push(x));
        else results.push(value);
    }
    return results;
}

export function getValues(data: any[]): IJoinValues {
    const values = flatMap(data);
    return {
        pattern: values.pop() || ", ",
        data: values
    };
}

function format(pattern: string, data: any[]): string {
    if (data.length == 0)
        return "";
    return data.join(pattern);
}

export function joinHelper(...data: any[]) {
    // pop off the options object
    data.pop();
    const values = getValues(data);
    const result = format(values.pattern, values.data);
    return new SafeString(result);
}

export function joinDistinctHelper(...data: any[]) {
    // pop off the options object
    data.pop();
    const values = getValues(data);
    const distinct = values.data.filter((x, i) => values.data.indexOf(x) == i);
    const result = format(values.pattern, distinct);
    return new SafeString(result);
}