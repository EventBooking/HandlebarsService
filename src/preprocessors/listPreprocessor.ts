const regex = /<([^<]*)({{#list ([\w\.]+)}})(.*)({{\/list}})([^>]*)>/g;
const subst = `{{#each $3}}<$1$4$6>{{/each}}`;

export function listPreprocessor(html: string): string {
    const result = html.replace(regex, subst);
    return result;
}