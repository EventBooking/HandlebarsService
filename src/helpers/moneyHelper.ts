import { SafeString } from "handlebars";
import { format } from "currency-formatter";

export type MoneyLike = {
    amount: number,
    currency: string
};

function formatPattern(value: string, currency: string, pattern: string) {
    switch (pattern) {
        case 'c':
            return `${value} ${currency}`;
        default:
            return value;
    }
}

export function moneyHelper(data: MoneyLike, pattern: string) {
    const currency = data.currency || "USD";
    const value = format(data.amount, { code: currency });
    const result = formatPattern(value, currency, pattern);
    return new SafeString(result);
}