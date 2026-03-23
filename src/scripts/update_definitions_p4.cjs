const fs = require('fs');

const payload = {
    fed_analytics: {
        def: {
            tech: "Non-disclosive federation techniques where statistical algorithms are algorithmically transmitted to, and evaluated concurrently across, disconnected data nodes, returning only deeply aggregated coefficients back to the central orchestrator.",
            researcher: "An analytical approach where you safely send your mathematical code to each hospital's dataset individually, and the software effortlessly mathematically combines the final answers for you.",
            gov: "A distributed computational model minimizing risk by rigidly ensuring raw data never egresses the secure perimeter; only deeply aggregated, non-identifiable statistical insights are formally transmitted.",
            public: "A clever system where the math explicitly goes to the data, instead of the data going to the math. The combined answers are then sent back to the researcher safely."
        },
        ex: {
            tech: "Distributing a complex logistic regression task across 4 TREs using DataSHIELD to calculate robust standard error metrics simultaneously without exposing patient variance.",
            researcher: "Training a breast cancer prediction model on outcomes across three distinct countries, sharing only the model's coefficients rather than any raw patient data.",
            gov: "An explicit legal framework specifically authorizing the execution of code from external parties, provided the output vector strictly passes automated statistical disclosure control.",
            public: "Asking five different hospitals totally separate questions to safely count exactly how many people have a specific disease, and just adding their final numbers together."
        }
    },
    ds_simul: {
        def: {
            tech: "Distributed computational synchronization where mathematical models are evaluated concurrently across separated nodes, producing a statistically identical aggregate output exactly as if the analysis had been executed on a fully pooled, centralized dataset.",
            researcher: "Advanced software that intelligently splits your analysis and runs it at the exact same time across every single hospital, combining the puzzle pieces perfectly mathematically inside the network.",
            gov: "A rigorous, non-disclosive analytical methodology flawlessly maintaining strict node isolation while ensuring extremely high-fidelity algorithmic output matching centralized benchmarks.",
            public: "A special computer program that runs a complex analysis simultaneously across lots of different databases, safely giving the exact same fast result as if all the data was stored in one giant place."
        },
        ex: {
            tech: "Calculating a unified, multi-site linear regression standard error metric dynamically utilizing secure, non-disclosive aggregate matrix multiplications.",
            researcher: "Running a single powerful command in R that instantly tallies millions of global patient records and gracefully returns just the final combined statistical graph.",
            gov: "A cross-institutional risk assessment certifying that the simultaneous query protocol robustly mathematically prevents any reverse-engineering of single-node data payloads.",
            public: "Automatically asking an identical complicated question at the exact same moment to ten distinct hospitals globally, and safely combining their swift answers in a flash."
        }
    },
    smpc: {
        def: {
            tech: "Cryptographic protocols (e.g., Shamir's Secret Sharing) systematically distributing a computation inextricably across multiple autonomous parties such that no individual party can mathematically deduce any other party's data inputs.",
            researcher: "Extremely secure abstract mathematics that allow multiple hospitals to powerfully compute a joint analysis while mathematically guaranteeing that their individual patients' real data remains utterly secret.",
            gov: "A highly advanced layer of mathematical security formally guaranteeing zero-knowledge proofs, satisfying even the most exceptionally stringent data protection and privacy regulations globally.",
            public: "A highly clever mathematical lock that magically allows groups of people to answer a math problem together without anyone ever seeing anyone else's private numbers."
        },
        ex: {
            tech: "A homomorphic encryption scheme successfully utilized to elegantly calculate a global arithmetic mean securely without exposing distinct floating-point variances.",
            researcher: "Three distinct hospitals collaborating to calculate the precise average age of their uniquely combined patients, without any hospital legally or technically learning the exact ages of patients at the other two.",
            gov: "Operating an SMPC cluster strictly to explicitly enable critical cross-border genomic meta-analysis where international patient data export is legally and permanently prohibited.",
            public: "Three doctors safely finding out the exact average age of all their distinct patients combined, without any of them ever revealing the age of their own specific patients."
        }
    },
    sep_analysis: {
        def: {
            tech: "Sequential, asynchronous federated queries wherein distinct, isolated analytical localized results or specifically localized model weights are transmitted asynchronously to the orchestrating node for subsequent manual meta-analysis.",
            researcher: "Running your statistical analysis script fully on the very first hospital's data, checking the aggregated output, and then carefully adjusting the script before cautiously sending it to the next hospital.",
            gov: "An iterative, human-in-the-loop federated workflow explicitly requiring deliberate, methodical Information Governance professional review at each discrete step of the sequential analytical process.",
            public: "A careful, step-by-step process where a brilliant researcher completely finishes safely checking one hospital's data independently before moving on to ask totally new questions at the very next hospital."
        },
        ex: {
            tech: "Orchestrating an iterative federated machine learning loop where an isolated foundational model is completely trained at Site A before its isolated neural weights are securely, manually transferred to Site B.",
            researcher: "Fitting a foundational statistical healthcare model meticulously at Oxford, and then deliberately validating that exact same model at Cambridge to see if the medical results confidently hold true.",
            gov: "Explicitly requiring a Data Access Committee to robustly and independently sign off on the specific query results from individual Site A before the researcher is subsequently permitted to approach individual Site B.",
            public: "A scientist diligently running a medical test safely at a hospital securely in London, writing down the final numerical answer, and then taking a train to run the exact same test safely at a completely different hospital securely in Manchester."
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
console.log('Definitions updated successfully for part 4');
