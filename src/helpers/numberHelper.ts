import { SafeString } from "handlebars";

/*
    Removes trailing zeros from a number
*/
export function numberHelper(data: number | string) {
    if (data == null)
        return "";
    if (typeof data == "string")
        data = +data;
    return new SafeString(data.toString());
}