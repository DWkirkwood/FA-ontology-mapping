const fs = require('fs');
const filepath = 'c:/Users/dalew/Downloads/ppie-insights-tool (1)/src/data/ontology.ts';
let content = fs.readFileSync(filepath, 'utf8');

// 1. Update interface
content = content.replace(
    /export interface OntologyNode \{[\s\S]*?\}/,
    `export interface OntologyNode {
    id: string;
    label: string;
    subtitle?: string;
    purpose?: string;
    type: EntityType;
    definitions: {
        public: string;
        tech: string;
        researcher: string;
        gov: string;
    };
    examples: {
        public: string;
        tech: string;
        researcher: string;
        gov: string;
        sde?: string; // Tabular view: SDE specific example
        dare?: string; // Tabular view: DARE UK specific example
    };
    essential_characteristics?: {
        description: string;
        tags: FrameworkTag[];
    }[];
    tags?: FrameworkTag[];
    children?: string[];
}`
);

// 2. Perform replacements on nodes
const nodeRegex = /([a-z_][a-z0-9_]*):\s*\{([^}]*id:\s*"[^"]*"[\s\S]*?(?:tags:\s*\[[^\]]*\]|\]|")),?\n?\s*\}(?=\s*,|\s*\n\s*\/\/|\s*\n\s*$)/g;
// Actually the previous regex `([a-z0-9_]+):\s*\{([^}]*id:\s*"[^"]*"[^]*?)\},` is better except there are arrays.
// Because essential_characteristics: [ "..." ] contains square brackets, wait!
// The nodes look like: fed_ecosystem: { id: "fed_ecosystem", ... tags: ["...", "..."] },
// We can just split by standard blocks if we know them.

const nodes = Object.keys(require('./extract_keys.cjs')); // wait cannot require.
