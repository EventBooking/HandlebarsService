import { SafeString } from "handlebars";

export function preHelper(data: number | string) {
    if (data == null)
        return "";
    const result = new SafeString(`<span class="prewrap">${data}</span>`);
    return result;
}