import { registerHelper, compile } from "handlebars";
import { numberHelper } from "./helpers/numberHelper";
import { inHelper, notInHelper } from "src/helpers/inHelper";

// registerHelper('number', numberHelper);
// registerHelper('in', inHelper);
// registerHelper('notin', notInHelper);

export function process<T>(html: string, data: T): string {
    const template = compile(html);
    const result = template(data);
    return result;
}