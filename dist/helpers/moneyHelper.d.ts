/// <reference types="handlebars" />
export declare type MoneyLike = {
    amount: number;
    currency: string;
};
export declare function moneyHelper(data: MoneyLike, pattern: string): hbs.SafeString;
