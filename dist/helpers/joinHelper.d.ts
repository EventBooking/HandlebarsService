/// <reference types="handlebars" />
export interface IJoinValues {
    pattern: string;
    data: any[];
}
export declare function getValues(data: any[]): IJoinValues;
export declare function joinHelper(...data: any[]): hbs.SafeString;
export declare function joinDistinctHelper(...data: any[]): hbs.SafeString;
