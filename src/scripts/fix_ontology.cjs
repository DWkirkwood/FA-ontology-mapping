const fs = require('fs');
const filepath = 'c:/Users/dalew/Downloads/ppie-insights-tool (1)/src/data/ontology.ts';
let content = fs.readFileSync(filepath, 'utf8');

content = content.replace(/tags\?: "Safe People"[\s\S]*?\[\];/, "tags?: FrameworkTag[];");
content = content.replace(/(?<!,)\s*\n\s*essential_characteristics:/g, ",\n        essential_characteristics:");

fs.writeFileSync(filepath, content);
console.log('Fixed syntax issues in ontology.ts');
