const fs = require('fs');

const filepath = 'c:/Users/dalew/Downloads/ppie-insights-tool (1)/src/data/ontology.ts';
let content = fs.readFileSync(filepath, 'utf8');

// The replacement content for fed_people
const replacement = `    fed_people: {
        id: "fed_people",
        definitions: {
            public: "A federation of people means different people or groups working together under shared rules, while each still keeps their own voice, role, or identity.",
            tech: "A federation of people is a structured collaborative arrangement in which distinct individuals, groups, or communities participate within a shared framework of rules, roles, and coordination, while retaining their own identity, autonomy, and local decision-making authority unless explicitly delegated.",
            researcher: "A federation of people is a model of human collaboration in which separate people or groups work together through agreed principles, governance, and coordination mechanisms, while remaining distinct rather than fully merging into a single unified body.",
            gov: "A federation of people is an arrangement in which different people, constituencies, or groups cooperate under shared rules and collective decision-making structures, while preserving defined local authority, representation, and accountability."
        },
        examples: {
            public: "Imagine several community groups joining together to speak with a stronger voice on an issue they all care about. They agree some common rules and goals, but each group still keeps its own identity and chooses how it contributes. That is a federation of people.",
            tech: "A national professional network may include multiple local chapters, each with its own leadership, membership, and priorities. They adopt a common constitution, shared standards, and agreed communication channels, allowing them to coordinate campaigns, share learning, and act collectively while each chapter retains local authority. That is a federation of people.",
            researcher: "A federation of people can be seen in a multi-site public advisory network where different local groups contribute to a shared programme of work. Each group retains its own membership, perspective, and local context, but participates in a wider framework for joint decision-making, knowledge exchange, and coordinated action.",
            gov: "An organisation may create a council made up of representatives from several independent member groups. The council agrees shared policies and strategic direction, but each member group remains responsible for its own community and local governance. This is a federation of people because authority is shared rather than fully centralised."
        },
        label: "Federation of People",
        purpose: "To enable individuals or groups to work together around shared goals without losing their own identity, voice, autonomy, or local responsibility.",
        type: "definition",
        
        children: ["fed_gov"],
        tags: ["Safe People", "PEDRI: Mutual Benefit", "PEDRI: Effective Involvement", "PEDRI: Culture of Engagement"],
        essential_characteristics: [
            { description: "Multiple distinct people or groups: There must be more than one person, team, community, or constituency involved.", tags: ["Safe People", "PEDRI: Culture of Engagement"] },
            { description: "Shared purpose: The federation exists to achieve something together that matters across the whole group.", tags: ["PEDRI: Mutual Benefit"] },
            { description: "Retained identity: Members do not stop being themselves in order to participate. Their own identity, perspective, or role remains meaningful.", tags: ["PEDRI: Equity/Diversity"] },
            { description: "Local autonomy: Individuals or groups keep some control over their own decisions, priorities, or actions.", tags: ["PEDRI: Effective Involvement"] },
            { description: "Shared rules or agreements: There is an agreed framework for how people work together, make decisions, or resolve differences.", tags: ["SATRE: Info Governance"] },
            { description: "Coordination across difference: The federation brings together people who are not identical, but who choose to cooperate.", tags: ["PEDRI: Culture of Engagement"] },
            { description: "Representation or voice: Members have a way of contributing to collective direction rather than simply being absorbed into a central authority.", tags: ["PEDRI: Effective Involvement"] },
            { description: "Defined accountability: It should remain clear what is decided locally, what is decided collectively, and who is responsible for what.", tags: ["SATRE: Info Governance", "PEDRI: Transparency"] },
            { description: "Collective benefit without full merger: The point is to gain the benefits of acting together without requiring complete unification.", tags: ["PEDRI: Mutual Benefit"] }
        ],},`;

// Replace the block from `fed_people: {` to `],},` immediately preceding `fed_data: {`
const regex = /fed_people:\s*\{[\s\S]*?id:\s*"fed_people",[\s\S]*?essential_characteristics:[\s\S]*?\],\},/;
content = content.replace(regex, replacement);

fs.writeFileSync(filepath, content);
console.log('Successfully updated fed_people node.');
