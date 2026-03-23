const fs = require('fs');
const filepath = 'c:/Users/dalew/Downloads/ppie-insights-tool (1)/src/data/ontology.ts';
let content = fs.readFileSync(filepath, 'utf8');

// 1. replace interface
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
    tags?: "Safe People" | "Safe Projects" | "Safe Settings" | "Safe Data" | "Safe Outputs" | "Findable" | "Accessible" | "Interoperable" | "Reusable" | "PEDRI: Equity/Diversity" | "PEDRI: Data Literacy" | "PEDRI: Two-way Comm" | "PEDRI: Transparency" | "PEDRI: Mutual Benefit" | "PEDRI: Effective Involvement" | "PEDRI: Culture of Engagement" | "SATRE: Info Governance" | "SATRE: Tech/Security" | "SATRE: Data Management" | "SATRE: Supporting Capabilities"[];
    children?: string[];
}`
);

const startIdx = content.indexOf('export const ontologyData');
if (startIdx === -1) throw new Error("Could not find ontologyData");

const preContent = content.substring(0, startIdx);
let dataContent = content.substring(startIdx);

dataContent = dataContent.replace(/([a-z0-9_]+):\s*\{\s*id:\s*"([^"]+)",([^}]+)\}/g, (match, key, id, body) => {
    let def_lay = body.match(/def_lay:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/)?.[1] || "";
    let def_tech = body.match(/def_tech:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/)?.[1] || "";
    let example = body.match(/example:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/)?.[1] || "";
    let example_sde = body.match(/example_sde:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/)?.[1] || "";
    let example_dare = body.match(/example_dare:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/)?.[1] || "";

    let newBody = body;
    ['def_lay', 'def_tech', 'example', 'example_sde', 'example_dare'].forEach(prop => {
        newBody = newBody.replace(new RegExp(`\\s*${prop}:\\s*"([^"\\\\]*(?:\\\\.[^"\\\\]*)*)",?`), '');
    });

    let chars = [];
    const charsMatch = newBody.match(/essential_characteristics:\s*\[([\s\S]*?)\]/);
    if (charsMatch) {
        let itemsText = charsMatch[1];
        let itemMatches = itemsText.match(/"([^"\\]*(?:\\.[^"\\]*)*)"/g) || [];
        chars = itemMatches.map(m => m.slice(1, -1)); // remove quotes
        newBody = newBody.replace(/essential_characteristics:\s*\[[\s\S]*?\],?/, '');
    }

    let defsBlock = `
        definitions: {
            public: "${def_lay}",
            tech: "${def_tech}",
            researcher: "${def_lay}",
            gov: "${def_tech}"
        },
        examples: {
            public: "${example}",
            tech: "${example}",
            researcher: "${example}",
            gov: "${example}"${example_sde ? `,\n            sde: "${example_sde}"` : ""}${example_dare ? `,\n            dare: "${example_dare}"` : ""}
        },`;

    if (key === 'fed_ecosystem') {
        newBody = newBody.replace(/label:\s*"([^"]*)",?/, 'label: "A Federation",\n        subtitle: "Federated Data Ecosystem",\n        purpose: "To enable secure collaborative research and analysis across multiple independent organizations without moving or compromising control of the underlying data.",');

        let customChars = `
        essential_characteristics: [
            { description: "Multiple independent parties: There must be more than one organisation, system, or data holder involved.", tags: ["Safe People", "Interoperable", "PEDRI: Mutual Benefit", "SATRE: Supporting Capabilities"] },
            { description: "Local autonomy: Each party keeps its own responsibilities, decision-making, and stewardship rather than becoming part of a single fully centralised system.", tags: ["Safe Settings", "Accessible", "PEDRI: Effective Involvement", "SATRE: Data Management"] },
            { description: "Shared rules or governance: The parties agree a common framework for how collaboration works, such as permissions, responsibilities, standards, and safeguards.", tags: ["Safe Projects", "Reusable", "PEDRI: Transparency", "SATRE: Info Governance"] },
            { description: "A common purpose for working together: The federation exists to enable something across the group, such as research, analytics, service improvement, or model development.", tags: ["Safe Outputs", "Findable", "PEDRI: Culture of Engagement", "SATRE: Info Governance"] },
            { description: "Interoperability or compatible ways of working: The organisations need some shared standards, technical compatibility, or agreed processes so joint work is actually possible.", tags: ["Safe Data", "Interoperable", "PEDRI: Data Literacy", "SATRE: Tech/Security"] },
            { description: "Use of assets across the group: Data, compute, models, tools, or other resources can be used in a coordinated way across members of the federation to achieve shared goals.", tags: ["Safe Data", "Reusable", "PEDRI: Mutual Benefit", "SATRE: Supporting Capabilities"] },
            { description: "Retention of local control: A key feature is that collaboration does not require each organisation to hand over full control of its own data or resources.", tags: ["Safe Settings", "Accessible", "PEDRI: Equity/Diversity", "SATRE: Data Management"] },
            { description: "Defined accountability: It should remain clear who is responsible for what, especially for governance, access, approvals, outputs, and risk.", tags: ["Safe Projects", "Findable", "PEDRI: Transparency", "SATRE: Info Governance"] },
            { description: "Not simply one technical method: Federation is broader than federated query, federated analytics, or federated learning. Those may be capabilities within a federation, but are not the whole concept.", tags: ["Safe Settings", "Interoperable", "PEDRI: Data Literacy", "SATRE: Tech/Security"] }
        ],`;
        newBody += customChars;
        // remove the old tags array because we are replacing tags at characteristic level
        // or just let it keep both
    } else {
        if (chars.length > 0) {
            let chBlock = chars.map(c => `{ description: "${c}", tags: [] }`).join(',\n            ');
            newBody += `\n        essential_characteristics: [\n            ${chBlock}\n        ],`;
        }
    }

    // append defs block right after id
    return `${key}: {\n        id: "${id}",${defsBlock}${newBody}}`;
});

// Since the array typing in OntologyNode needs an exact type for tags... let's just make sure.
content = preContent + dataContent;
// fix the weird array in the regex replacement above (tags?: "Safe People" | ... [])
// Actually it should just be FrameworkTag[]
content = content.replace(/tags\?: "Safe People" \|[\s\S]*?\[\];/, "tags?: FrameworkTag[];");

fs.writeFileSync(filepath, content);
console.log('Migrated ontology v2 successfully');
