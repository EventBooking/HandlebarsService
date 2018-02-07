# HandlebarsService

```
import * as hbsService from "handlebarsservice";

const html = "{{#each items}}<div>values</div>{{/each}}";
const data = [1,2,3,4];
const result = hbsService.process(html, data);

console.log(result); // 1234
```