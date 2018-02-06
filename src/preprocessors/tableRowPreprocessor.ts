const regex = /(<tr.*><td.*)(\{\{#tablerow ([\w\.]+)\}\})(.*)(\{\{\/tablerow\}\})(.*<\/td><\/tr>)/g;
const subst = `{{#each $3}}$1$4$6{{/each}}`;

export function tableRowPreprocessor(html: string): string {
    const result = html.replace(regex, subst);
    return result;
}