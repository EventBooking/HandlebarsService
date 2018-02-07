"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regex = /(<tr.*><td.*)(\{\{#tablerow ([\w\.]+)\}\})(.*)(\{\{\/tablerow\}\})(.*<\/td><\/tr>)/g;
var subst = "{{#each $3}}$1$4$6{{/each}}";
function tableRowPreprocessor(html) {
    var result = html.replace(regex, subst);
    return result;
}
exports.tableRowPreprocessor = tableRowPreprocessor;
