import { SafeString } from "handlebars";

const True = new SafeString("true");
const False = new SafeString("false");

function _in<T>(data: T, values: T | Array<T>) {
    if (data == null || values == null)
        return false;
    if (!(values instanceof Array))
        values = [values];
    return values.indexOf(data) > -1;
}

export function inHelper<T>(data: T, values: T | Array<T>) {
    return _in(data, values) ? True : False;
}

export function notInHelper<T>(data: T, values: T | Array<T>) {
    return _in(data, values) ? False : True;
}