const fs = require('fs');

const payload = {
    fed_gov: {
        def: {
            tech: "The overarching legal, administrative, and ethical frameworks establishing baseline policies, Data Processing Agreements (DPAs), and liabilities for all consortium operations and cross-institutional workflows.",
            researcher: "The established set of rules, ethics panels, and legal agreements that dictate exactly how, when, and by whom the federated data can be queried.",
            gov: "The formalized risk-management, legal, and operational structures that bind independent institutions together, ensuring unified compliance with privacy laws, information security standards, and ethical requirements.",
            public: "The rules, agreements, and teams of people who formally decide who is allowed to use the data, how they must protect it, and what they can use it for."
        },
        ex: {
            tech: "A consortium charter stipulating acceptable uses, indemnification clauses, and joint-controllership liabilities for analyzing shared genomic variants.",
            researcher: "A centralized ethics board that rigidly reviews your study protocol to ensure it complies with the federation's rules before code execution.",
            gov: "Executing a multilateral Data Sharing Agreement signed by 10 university Vice-Chancellors defining strict liability for any data breaches.",
            public: "A strict rulebook that every hospital and researcher must thoroughly read and sign before they are allowed to join the research network."
        }
    },
    access_process: {
        def: {
            tech: "Standardized, auditable workflows and identity verification procedures evaluating researcher credentials, project scope, and legal compliance before granting programmatic authorizations to data enclaves.",
            researcher: "The formal, multi-step application you must carefully follow—such as submitting training certificates and a detailed project protocol—to receive permission to query the network's data.",
            gov: "The operationalization of information governance policies into measurable, standardized steps that gatekeep system access, ensuring all legal and ethical prerequisites are met and organizational risk is mitigated.",
            public: "The strict security checks and detailed application forms a scientist must complete and pass before they are given permission to see or use any data."
        },
        ex: {
            tech: "An automated Identity and Access Management pipeline integrating institutional ORCID credentials with a federated access gateway following explicit committee approval.",
            researcher: "Submitting a 5-page research protocol detailing exactly what statistical models you will run, and waiting for the designated committee to formally approve it.",
            gov: "Implementing a strict 'Five Safes' framework checklist that must be fully satisfied and signed off by the Information Asset Owner before an account is provisioned.",
            public: "A thorough background check and application form asking the scientist exactly why they need the data and how it will tangibly help patients."
        }
    },
    dacs: {
        def: {
            tech: "Independent, multi-disciplinary governance boards responsible for auditing, deliberating on, and validating specific data access requests against predefined, mathematically and ethically rigorous risk criteria.",
            researcher: "A panel of domain experts, ethical stewards, and public members who review your research proposal to verify it is safe and valuable before handing you the keys.",
            gov: "The delegated authority bodies entrusted with formally assessing the risk-versus-reward of specific data uses, ensuring total compliance with original consent protocols and institutional risk appetite.",
            public: "A group of trusted experts, healthcare professionals, and everyday people who review every single request and have the absolute power to say 'yes' or 'no' to a researcher."
        },
        ex: {
            tech: "A federated committee meeting monthly to review specific, granular FHIR scope requests alongside automated algorithmic output privacy bounds.",
            researcher: "Answering tough questions from a panel composed of two clinicians, a statistician, and a patient representative who want to ensure your study won’t accidentally identify individuals.",
            gov: "A formalized board operating under strict Terms of Reference that minutely records its rationale for approving or rejecting applications to satisfy external audit requirements.",
            public: "A committee spanning multiple local patients that carefully reads a scientist's plan and decides if it is a truly safe, ethical, and beneficial use of their hospital's data."
        }
    },
    fed_access: {
        def: {
            tech: "Delegated authentication, credential translation, and authorization mechanisms enabling secure, transparent cross-domain identity verification across distributed, autonomous data resources.",
            researcher: "The underlying technology that allows you to seamlessly use your home university's standard login details to securely access tools and analytical environments hosted by completely different institutions.",
            gov: "A formal trust framework established between disparate organizations that legally allows them to securely rely on each other's identity vetting and credential management processes.",
            public: "A secure digital passport system that lets an approved scientist securely unlock and use data at several different hospitals using just one secure ID card."
        },
        ex: {
            tech: "Using an OAuth 2.0 flow to dynamically exchange a local institutional OIDC token for a scoped access JWT valid at a remote federated node.",
            researcher: "Logging into the secure national health database instantaneously using the exact same username and password you use daily to check your regular university email.",
            gov: "A national trust federation agreement where trusted universities legally vouch for the verified identity and current employment status of their researchers.",
            public: "A doctor using their verified hospital ID badge to seamlessly and securely log into a research computer system located at a totally different university."
        }
    }
};

const filepath = 'c:/Users/dalew/Downloads/ppie-insights-tool (1)/src/data/ontology.ts';
let content = fs.readFileSync(filepath, 'utf8');

for (const [key, data] of Object.entries(payload)) {
    const defRegex = new RegExp(`(${key}:\\s*\\{[\\s\\S]*?id:\\s*"${key}",[\\s\\S]*?definitions:\\s*\\{)[\\s\\S]*?(\\},\\s*examples:\\s*\\{)`);
    content = content.replace(defRegex, (match, before, after) => {
        return `${before}\n            public: ${JSON.stringify(data.def.public)},\n            tech: ${JSON.stringify(data.def.tech)},\n            researcher: ${JSON.stringify(data.def.researcher)},\n            gov: ${JSON.stringify(data.def.gov)}\n        ${after}`;
    });

    const exRegex = new RegExp(`(${key}:\\s*\\{[\\s\\S]*?id:\\s*"${key}",[\\s\\S]*?examples:\\s*\\{)[\\s\\S]*?(\\},\\s*(?:label|essential_characteristics|tags|children|type):)`);
    content = content.replace(exRegex, (match, before, after) => {
        return `${before}\n            public: ${JSON.stringify(data.ex.public)},\n            tech: ${JSON.stringify(data.ex.tech)},\n            researcher: ${JSON.stringify(data.ex.researcher)},\n            gov: ${JSON.stringify(data.ex.gov)}\n        ${after}`;
    });
}

fs.writeFileSync(filepath, content);
console.log('Definitions updated successfully for part 2');
