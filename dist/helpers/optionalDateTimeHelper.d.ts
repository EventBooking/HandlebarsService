/// <reference types="handlebars" />
import "twix";
export declare const IsoDate = "YYYY-MM-DD";
export declare const IsoDateTime = "YYYY-MM-DDThh:mm:ss";
export declare type OptionalDateTimeLike = {
    date: string;
    isAllDay: boolean;
    startTime?: string;
    endTime?: string;
};
export declare function optionalDateTimeHelper(value: OptionalDateTimeLike, locale?: string): hbs.SafeString;
