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
    data = flatMap(data);
    console.log(`data=${JSON.stringify(data)}`);
    if (data.length < 1)
        data = [", "];
    const pattern = data.pop();
    console.log(`pattern=${JSON.stringify(pattern)}, data=${JSON.stringify(data)}`);
    return {
        pattern: pattern,
        data: data
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
    console.log(`values="${JSON.stringify(values)}"`);
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