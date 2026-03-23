const fs = require('fs');

const payload = {
    datashield: {
        def: {
            tech: "An open-source, client-server software architecture designed specifically for non-disclosive federated analysis, programmatically ensuring only deeply aggregated, statistically safe summary statistics return to the analytical client.",
            researcher: "An R-based software package that securely runs statistical models simultaneously across several different hospital databases, automatically blocking any command that might accidentally reveal a single person's data.",
            gov: "A rigorously tested, community-driven technical control enforcing robust statistical disclosure limitations at the point of query execution, heavily mitigating the risk of inadvertent re-identification during multi-site research.",
            public: "A specially designed computer program that securely calculates medical statistics across different hospitals, automatically blocking any math that could accidentally reveal who a patient is."
        },
        ex: {
            tech: "Executing the ds.glm command to orchestrate a unified generalized linear model across 4 physically disconnected Opal data servers.",
            researcher: "Typing a single command in RStudio that calculates the average BMI of 500,000 patients spanning 5 countries, receiving only the final number back.",
            gov: "Approving the use of DataSHIELD within a consortium because its core parser explicitly refuses to execute disclosive base functions like head() or print().",
            public: "A scientist running a safe spelling-check program that only tells them how many times the word 'asthma' appears across ten hospitals, but absolutely refuses to show the actual sentences."
        }
    },
    trevolution: {
        def: {
            tech: "An architectural blueprint and active development initiative aiming to standardize APIs and secure interoperability protocols natively between disparate Trusted Research Environments (TREs) to facilitate seamless, secure federated workflows.",
            researcher: "An initiative striving to make completely different secure data environments structurally talk to each other, so you don't have to learn five different complex systems just to run one combined analysis.",
            gov: "A strategic framework pursuing harmonized standards, shared computational capabilities, and reciprocal trust agreements across independent, sovereign TRE implementations globally.",
            public: "A large project trying to build a universal, secure set of train tracks so that approved medical research can securely travel between different, disconnected hospital computer systems."
        },
        ex: {
            tech: "Implementing a unified, cross-TRE API specification allowing a single researcher identity token to safely provision ephemeral compute containers across three distinct cloud enclaves.",
            researcher: "Submitting a single unified script via a specialized portal that successfully translates your code natively into the different formats required by three different secure databases.",
            gov: "A consortium formally adopting the DARE UK interoperability standards to strategically align institutional policies and safely enable cross-boundary queries.",
            public: "Building a secure system that seamlessly translates the different computer languages used by different hospitals so they can all finally answer the same research question together."
        }
    },
    tes: {
        def: {
            tech: "The Global Alliance for Genomics and Health (GA4GH) Task Execution Schema (TES) is a standardized API for describing, orchestrating, and executing batch computing tasks securely across diverse, decentralized computing environments.",
            researcher: "A standardized set of technical instructions allowing you to reliably package up your complex genomic analysis pipeline and command it to run smoothly on fundamentally different computer systems around the world.",
            gov: "A widely adopted, community-governed data standard ensuring robust vendor neutrality and deep interoperability, allowing institutions to flexibly collaborate regardless of their underlying hardware provider.",
            public: "A universally agreed standard way of writing computer instructions so that totally different hospital computers all know exactly how to safely run the exact same complex science experiment."
        },
        ex: {
            tech: "Generating a unified TES JSON payload to securely trigger a containerized variant-calling pipeline dynamically across AWS, GCP, and local HPC edge nodes simultaneously.",
            researcher: "Writing your complex genome alignment workflow just once, and successfully broadcasting it to confidently compute instantly on 10 different global databases.",
            gov: "Standardizing an international genome consortium entirely onto GA4GH APIs, systematically bypassing the immense legal and technical hurdles of forcing every member to buy the exact same software.",
            public: "Sending a perfectly written, standardized medical recipe to ten different hospital kitchens, knowing their different robot chefs will all securely bake the exact same cake."
        }
    },
    ohdsi: {
        def: {
            tech: "An international collaborative utilizing the structured OMOP Common Data Model (CDM) to deeply harmonize heterogeneous observational health data, enabling standardized, large-scale federated statistical methodologies.",
            researcher: "A widely used standardized system that translates messy, completely different hospital records from all around the world into one single identical structure, making global health comparisons finally possible.",
            gov: "A profoundly influential open-science data standardization initiative that vastly reduces friction for cross-institutional studies by aggressively converting complex local data idiosyncrasies into a unified semantic format.",
            public: "A massive international project that safely translates totally different hospital medical files into one universal medical language, so researchers can instantly compare diseases across the entire world."
        },
        ex: {
            tech: "Executing an identical, standardized SQL query utilizing the OHDSI ATLAS toolkit seamlessly across 50 disparately hosted, globally distributed OMOP-mapped relational databases.",
            researcher: "Running a massive study to see if a new blood pressure pill works identically in America, Japan, and the UK, because all their complex data is formatted safely in the exact same way.",
            gov: "A national health system mandating the complete ontological mapping of all historical primary care records to SNOMED-CT uniquely within the OMOP CDM.",
            public: "Automatically safely translating French, Japanese, and English medical records into an identical, perfectly organized universal spreadsheet so a computer can quickly find global health patterns."
        }
    },
    opensafely: {
        def: {
            tech: "A highly secure, intrinsically federated analytics platform utilizing a unique open-source tiering architecture, allowing researchers to safely execute code natively against millions of primary care records without interacting directly with disclosive granular data.",
            researcher: "A highly locked-down, specialized web platform where you write your analysis code completely in the open, verify it works on fake dummy data, and then ask the system to safely execute it on real patient data hidden securely behind a wall.",
            gov: "An aggressively transparent, privacy-by-design secure platform uniquely mandating that all analytical code utilized within the environment must be published entirely openly for supreme public accountability.",
            public: "A uniquely transparent computer system that safely answers complex health questions using millions of medical records, while rigidly publishing exactly what code the researchers used for everyone to see."
        },
        ex: {
            tech: "Initiating a computationally heavy SQL aggregation over 58 million primary care rows dynamically within the TPP secure environment using securely curated Docker containers.",
            researcher: "Pushing your epidemiological Python script to GitHub, where the OpenSAFELY bot securely grabs it, runs it autonomously on real patient files, and safely hands you back just the final statistical graph.",
            gov: "Fully satisfying intense public privacy concerns during a pandemic by explicitly embedding an auditable, open-source code requirement directly into the core data access pipeline.",
            public: "A secure robot that takes your medical questions, securely looks at millions of real hospital files, safely gives you just the answer, and then transparently posts everything it did online for the public to check."
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
console.log('Definitions updated successfully for part 5');
