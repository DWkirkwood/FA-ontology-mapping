const fs = require('fs');
const filepath = 'c:/Users/dalew/Downloads/ppie-insights-tool (1)/src/data/ontology.ts';
let content = fs.readFileSync(filepath, 'utf8');

// 1. Add related_terms to Interface
if (!content.includes('related_terms?: {')) {
    content = content.replace(
        /tags\?: FrameworkTag\[\];/,
        `tags?: FrameworkTag[];\n    related_terms?: {\n        term: string;\n        definition: string;\n    }[];`
    );
}

// 2. Replace fed_data
const replacement = `    fed_data: {
        id: "fed_data",
        definitions: {
            public: "Federated data means data is kept in different places, but can still be used together under agreed rules without everyone having to hand it all over to one central place.",
            tech: "Federated data is a distributed data arrangement in which datasets remain under the stewardship of their original holders, but can be accessed, queried, analysed, or linked in agreed ways across a shared governance and interoperability framework, without routine central pooling of source-level data.",
            researcher: "Federated data is data held across multiple independent organisations or systems that can be used in a coordinated way under shared rules, while each organisation retains stewardship and control over its own data.",
            gov: "Federated data is data held across multiple independent organisations or systems that can be used in a coordinated way under shared rules, while each organisation retains stewardship and control over its own data."
        },
        examples: {
            public: "Several hospitals each keep their own patient records. Instead of sending all that data to one big national database, they agree shared rules so the same approved research question can be answered across all of them. The data stays with each hospital, but the research can still use the combined picture.",
            tech: "Five NHS trusts each hold local patient data within their own secure environments. The trusts adopt common governance, mapped data standards, and interoperable tooling so that one approved analysis can run across all five local datasets. Queries or analytic code are sent to each site, executed locally, and only agreed summary outputs are returned. The underlying source data remains under the stewardship of each trust.",
            researcher: "During COVID, hospitals in different parts of the country might each keep their own patient records, but agree common rules so researchers can find out how many patients were admitted, how many needed intensive care, and which treatments were linked to better outcomes. Each hospital keeps control of its own data, but the wider system can still learn from it.",
            gov: "Federated data allows multiple data holders to contribute to a shared analysis while keeping the source data under local stewardship."
        },
        label: "Federated Data",
        purpose: "To let multiple organisations use data together in a coordinated way without requiring all the source data to be moved into one central place.",
        type: "definition",
        
        children: ["fed_infra", "fed_storage"],
        tags: ["Safe Data", "Findable", "Accessible", "Interoperable", "SATRE: Tech/Security", "SATRE: Data Management"],
        essential_characteristics: [
            { description: "Data held in more than one place: The data remains distributed across multiple organisations, systems, or secure environments.", tags: ["Safe Data", "SATRE: Data Management"] },
            { description: "Multiple data stewards or controllers: Different parties remain responsible for their own datasets, rather than everything being owned or governed centrally.", tags: ["SATRE: Info Governance"] },
            { description: "Local control is retained: Each organisation keeps stewardship over its own data, including decisions about access, use, and governance.", tags: ["Safe Settings"] },
            { description: "The data can be used across the group in a coordinated way: Even though the data is separate, it can still contribute to shared analysis, research, or insight.", tags: ["Accessible", "Reusable"] },
            { description: "Some degree of interoperability: There needs to be enough common structure, standards, mapping, or agreed meaning for work across datasets to be possible.", tags: ["Interoperable"] },
            { description: "Shared rules for access and use: Federated data depends on agreed governance, permissions, and safeguards, not just technical connectivity.", tags: ["Safe Projects", "SATRE: Info Governance"] },
            { description: "Data does not have to be routinely pooled centrally: A core feature is that useful work can happen without first moving all source-level data into one central database.", tags: ["Safe Settings"] },
            { description: "Only appropriate outputs, queries, or models may move: What travels across the federation may be code, queries, parameters, or approved results rather than raw source data.", tags: ["Safe Outputs"] },
            { description: "Context and provenance remain important: Because data comes from different places, it is important to preserve information about origin, quality, meaning, and local context.", tags: ["Findable", "PEDRI: Data Literacy"] },
            { description: "It is broader than one technical method: Federated data is not the same thing as federated query, federated analytics, or federated learning. Those are ways of working with federated data.", tags: ["SATRE: Tech/Security"] }
        ],
        related_terms: [
            { term: "Federation", definition: "the broader collaboration model" },
            { term: "Federated data", definition: "the distributed data landscape within that model" },
            { term: "Federated analytics", definition: "analysis performed across that distributed data" },
            { term: "Federated learning", definition: "training models across distributed data without routine central pooling" }
        ]},`;

const regex = /fed_data:\s*\{[\s\S]*?id:\s*"fed_data",[\s\S]*?essential_characteristics:[\s\S]*?\],\},/;
content = content.replace(regex, replacement);

fs.writeFileSync(filepath, content);
console.log('Successfully updated fed_data node.');
