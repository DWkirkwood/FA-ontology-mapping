const fs = require('fs');

const filepath = 'c:/Users/dalew/Downloads/ppie-insights-tool (1)/src/data/ontology.ts';
let content = fs.readFileSync(filepath, 'utf8');

// The replacement content for fed_access
const replacement = `    fed_access: {
        id: "fed_access",
        definitions: {
            public: "Federated access means people can be given approved access across different organisations using shared rules, while each organisation still decides what can and cannot be accessed.",
            tech: "Federated access is an access model in which independent organisations or systems trust agreed identity, authentication, and authorisation arrangements so that approved users, services, or processes can access resources across organisational boundaries while control over those resources remains with the local owner.",
            researcher: "Federated access is a way of enabling people to use data or services across multiple organisations through shared access arrangements, without requiring each organisation to give up control of its own systems or permissions.",
            gov: "Federated access is an access arrangement in which organisations recognise shared identity or approval mechanisms to permit appropriate cross-organisational access, while each organisation remains responsible for its own rules, safeguards, and decisions about what is allowed."
        },
        examples: {
            public: "Imagine a researcher who is approved to work on a project involving more than one hospital. Federated access means the hospitals can recognise that person’s approved identity through shared arrangements, but each hospital still decides exactly what information or systems they are allowed to use.",
            tech: "A researcher at University A signs in using their home institution credentials. Through a federated identity and access arrangement, a secure analysis platform at NHS Organisation B recognises their authenticated identity and mapped role, then permits access only to the approved workspace and tools defined by Organisation B’s local policies.",
            researcher: "A multi-site study allows approved researchers from different institutions to access the same secure research service without each site creating a completely separate local account from scratch for every user. Access is enabled through shared identity arrangements, but each site still controls what each researcher can do.",
            gov: "Several organisations agree a common access framework so that staff or researchers from trusted partner institutions can request and receive access using recognised identity checks and approval routes. Even so, each organisation remains responsible for deciding which resources are accessible and under what safeguards."
        },
        label: "Federated Access",
        purpose: "To allow approved people or systems to access data, tools, or services across more than one organisation or environment without needing everything to be moved into one place or managed through one single local account structure.",
        type: "definition",
        
        tags: ["Safe People", "Safe Settings", "SATRE: Info Governance"],
        essential_characteristics: [
            { description: "More than one organisation or system involved: Federated access only makes sense where access crosses boundaries.", tags: ["Safe People"] },
            { description: "A shared trust framework: The participating parties need agreed rules for recognising identities, approvals, or access decisions.", tags: ["SATRE: Info Governance"] },
            { description: "Local control over resources: Each organisation still decides what can be accessed, by whom, and under what conditions.", tags: ["Safe Settings"] },
            { description: "Identity recognition across boundaries: A user, role, or service can be recognised beyond its home organisation through agreed arrangements.", tags: ["Safe People"] },
            { description: "Authentication and authorisation mechanisms: There must be a way to confirm who someone is and what they are allowed to do.", tags: ["SATRE: Info Governance"] },
            { description: "No need for full centralisation: Access can be coordinated without requiring all users, data, or systems to be merged into one central environment.", tags: ["Safe Settings"] },
            { description: "Defined accountability: It should remain clear who approved access, who granted it, who used it, and who is responsible for oversight.", tags: ["SATRE: Info Governance"] },
            { description: "Safeguards and permissions are context-specific: Access is not automatically universal. It is governed by rules, roles, and local policy.", tags: ["Safe Projects"] }
        ],},`;

// Build the regex to strictly match from `fed_access: {` to `],},` that precedes the NEXT key `ds_simul: {`
const regex = /fed_access:\s*\{[\s\S]*?id:\s*"fed_access",[\s\S]*?essential_characteristics:[\s\S]*?\],\},/;
content = content.replace(regex, replacement);

fs.writeFileSync(filepath, content);
console.log('Successfully updated fed_access node.');
