const fs = require('fs');

const payload = {
    fed_ecosystem: {
        def: {
            tech: "A comprehensive architectural and governance framework integrating decentralized storage, standardized coordination protocols, and distributed computational queries, allowing participating institutions to analyze joint datasets without transferring, co-mingling, or relinquishing sovereignty over the underlying data.",
            researcher: "An established network of institutions and technological systems enabling researchers to query, analyze, and combine insights from datasets held in multiple distinct locations, without needing to copy or centralize the data itself.",
            gov: "A formal collaboration mutually governed by shared rules, standardized access protocols, and data protection safeguards, enabling secure cross-institutional analysis while maintaining local accountability, sovereignty, and regulatory compliance.",
            public: "A secure system where multiple organizations agree to let researchers analyze their combined data, without any of the data ever leaving its original, safe location."
        },
        ex: {
            tech: "Deploying a federated learning algorithm across 15 distinct OMOP-formatted hospital databases using cryptographic secure multiparty computation.",
            researcher: "Running a single statistical script that simultaneously tests a hypothesis on patient data sitting securely at both King's College London and the University of Edinburgh.",
            gov: "A consortium executing a master Data Processing Agreement (DPA) that explicitly allows a central Data Access Committee to approve federated workflows.",
            public: "A national health project linking records from 50 hospitals to find disease patterns, without ever creating a central copy of those records."
        }
    },
    fed_people: {
        def: {
            tech: "A formalized consortium of domain researchers, administrative stewards, and participating organizations bound by interoperable governance frameworks, standardized data-sharing agreements, and synchronized access protocols.",
            researcher: "The collaborative network of investigators, data stewards, and public contributors who work together across different institutions under a shared set of rules to enable joint research.",
            gov: "The human and administrative infrastructure of a federation, requiring aligned ethical standards, harmonized training requirements, and transparent decision-making processes across independent participating legal entities.",
            public: "The groups of people—including researchers, hospital staff, and patients—who agree to work together across different organizations to make research happen securely."
        },
        ex: {
            tech: "A federated identity management (FIM) network mapping institutional OpenID Connect credentials to unified role-based access controls across the entire consortium.",
            researcher: "A multi-site clinical trial team sharing analytical methodologies and coordinating data access applications through a unified researcher portal.",
            gov: "A multi-institutional steering committee standardizing the minimum Information Governance training requirements for all researchers accessing the federated network.",
            public: "A research team from London collaborating seamlessly with a data protection board in Manchester to study rare genetic diseases."
        }
    },
    fed_data: {
        def: {
            tech: "A decentralized data management architecture wherein datasets physically reside in sovereign endpoints, but their metadata, semantic structures, and access APIs are rigidly harmonized to allow programmatic cross-querying.",
            researcher: "Data that remains securely stored at its original institution but is cataloged, standardized, and exposed so authorized researchers can discover and query it remotely as if it were a single combined dataset.",
            gov: "Distributed data assets that permanently remain under the sovereign control and legal stewardship of their originating organizations, while being technically and administratively exposed for approved joint analyses.",
            public: "Information that is kept safely where it was collected (like a local hospital), but is connected to a secure network so authorized researchers can find and learn from it."
        },
        ex: {
            tech: "A distributed network of FHIR-compliant REST endpoints exposing unified semantic ontologies for dynamic, federated GraphQL queries across heterogeneous SQL backends.",
            researcher: "Searching a central catalog to query how many patients with asthma exist across three different autonomous hospital trusts, before successfully applying to analyze their records.",
            gov: "An institutional data controller cryptographically hashing patient identifiers locally before exposing aggregated population outcome counts safely to a federation.",
            public: "An automated system connecting primary care data and hospital admissions data so a computer algorithm can check both without actually combining the files."
        }
    }
};

const filepath = 'c:/Users/dalew/Downloads/ppie-insights-tool (1)/src/data/ontology.ts';
let content = fs.readFileSync(filepath, 'utf8');

for (const [key, data] of Object.entries(payload)) {
    // We target the block starting with `${key}: {` and ending before the next `essential_characteristics` or `tags` or children
    // Better yet, just replace the entire definitions object.
    const defRegex = new RegExp(`(${key}:\\s*\\{[\\s\\S]*?id:\\s*"${key}",[\\s\\S]*?definitions:\\s*\\{)[\\s\\S]*?(\\},\\s*examples:\\s*\\{)`);
    content = content.replace(defRegex, (match, before, after) => {
        return `${before}\n            public: ${JSON.stringify(data.def.public)},\n            tech: ${JSON.stringify(data.def.tech)},\n            researcher: ${JSON.stringify(data.def.researcher)},\n            gov: ${JSON.stringify(data.def.gov)}\n        ${after}`;
    });

    const exRegex = new RegExp(`(${key}:\\s*\\{[\\s\\S]*?id:\\s*"${key}",[\\s\\S]*?examples:\\s*\\{)[\\s\\S]*?(\\},\\s*(?:label|essential_characteristics|tags|children):)`);
    content = content.replace(exRegex, (match, before, after) => {
        return `${before}\n            public: ${JSON.stringify(data.ex.public)},\n            tech: ${JSON.stringify(data.ex.tech)},\n            researcher: ${JSON.stringify(data.ex.researcher)},\n            gov: ${JSON.stringify(data.ex.gov)}\n        ${after}`;
    });
}

fs.writeFileSync(filepath, content);
console.log('Definitions updated successfully for part 1');
