"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regex = /<([^<]*)({{#list ([\w\.]+)}})(.*)({{\/list}})([^>]*)>/g;
var subst = "{{#each $3}}<$1$4$6>{{/each}}";
function listPreprocessor(html) {
    var result = html.replace(regex, subst);
    return result;
}
exports.listPreprocessor = listPreprocessor;
