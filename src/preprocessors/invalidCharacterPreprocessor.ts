function replaceWithTick(html: string): string {
    const result = html.replace(/\u2018|\u2019/g, `'`);
    return result;
}

function replaceWithQuote(html: string): string {
    const result = html.replace(/\u201C|\u201D/g, `"`);
    return result;
}

const replaceFunctions = [
    replaceWithTick,
    replaceWithQuote
];

export function invalidCharacterPreprocessor(html: string): string {
    const results = replaceFunctions.reduce((html, fn) => fn(html), html);
    return results;
}