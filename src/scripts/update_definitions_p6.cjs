const fs = require('fs');

const payload = {
    research_outputs: {
        def: {
            tech: "The aggregate empirical artifacts (e.g., statistical distributions, trained hyper-parameters, or peer-reviewed manuscripts) synthesized conditionally across the distributed network intended for academic or operational dissemination.",
            researcher: "The final scientific answers—like statistical graphs, average numbers, or trained machine learning models—that you actually take away from the secure environment to publish in your paper.",
            gov: "The fully controlled externalization of data insights, stringently evaluated against the 'Safe Outputs' principle to irrevocably legally prove that no protected health information has breached the secure perimeter.",
            public: "The final scientific discoveries, charts, and numbers that researchers are completely allowed to take home and publish to help find cures for diseases."
        },
        ex: {
            tech: "Exporting an aggregated, non-disclosive Kaplan-Meier survival curve plot after successfully executing a multi-site retrospective cohort study.",
            researcher: "Downloading the final bar chart showing the statistical difference in drug effectiveness between three distinct countries so you can put it into your scientific journal article.",
            gov: "Formally logging and archiving the exact aggregate statistics permanently removed from the secure environment to provide an immutable trail for future compliance audits.",
            public: "Publishing a widely read news article showing that a new cancer treatment works 20% better, without ever revealing any single patient's name to the press."
        }
    },
    intermediate_outputs: {
        def: {
            tech: "In-flight, non-terminal statistical artifacts (e.g., node-specific model weights or gradient updates) exchanged iteratively between distinct federated endpoints during the execution of a distributed query loop.",
            researcher: "The messy, half-finished math calculations that your computer code needs to automatically pass back and forth between different hospitals before it can finally solve the whole puzzle.",
            gov: "Iterative computational byproducts that still strictly remain within the formally accredited security boundary, governed by automated technical controls blocking unauthorized human observation.",
            public: "The invisible, secret numbers that the computers automatically whisper to each other while they are working together to safely solve a hard math problem."
        },
        ex: {
            tech: "Transmitting local gradients from an edge hospital node back to a central orchestrator server securely during round 4 of a federated deep learning epoch.",
            researcher: "Your software automatically checking a preliminary mathematical sub-total with a hospital in Edinburgh before seamlessly adding it to the final equation in London.",
            gov: "Cryptographically encrypting all iterative data packets safely exchanged between Site A and Site B to guarantee that random network interception yields absolutely zero usable patient information.",
            public: "Two hospital computers quickly swapping completely half-finished math problems over a secure line so they can figure out the final answer together."
        }
    },
    final_outputs: {
        def: {
            tech: "The terminal, synthesized statistical results formally approved for definitive egress from the trusted research environment following rigorous algorithmic or manual disclosure risk mitigation.",
            researcher: "The fully checked, completely safe final numbers and graphs that the security team officially signs off on, allowing you to finally download them to your own laptop.",
            gov: "The legal and absolute culmination of the information governance lifecycle, formally absolving the analytical payload of all distinct personal identifiers.",
            public: "The totally safe, checked, and officially approved discoveries that a scientist is completely allowed to take out of the secure hospital computer network."
        },
        ex: {
            tech: "Successfully extracting a globally calculated p-value and confidence interval matrix after identically applying rule-based cell suppression algorithms (k-anonymity=5).",
            researcher: "Getting an email saying the security team has personally approved the final five charts you made, and they are now ready for you to safely download.",
            gov: "An Information Asset Owner formally accepting liability and legally declaring that an aggregated statistical table poses absolutely zero risk of re-identification to any constituent.",
            public: "A scientist walking confidently out of the secure hospital doors holding a piece of paper that only has the number '42%' written on it, safely answering their research question."
        }
    },
    fed_outputs: {
        def: {
            tech: "The orchestrated, complex meta-analytical collation of multiple, disparate node-level statistical outputs into a unified, coherent global estimate strictly within the federated orchestrator framework.",
            researcher: "The final step where the software automatically catches all the different answers thrown back by the different hospitals and expertly stitches them together into one final, highly accurate master result.",
            gov: "The formal, algorithmic aggregation phase that structurally ensures no individual localized site is disproportionately exposed or maliciously reverse-engineerable from the terminal aggregated release.",
            public: "The final, magical step where the computer perfectly glues all the different pieces of the puzzle together from the different hospitals to clearly reveal the big picture."
        },
        ex: {
            tech: "Calculating a global DerSimonian-Laird random-effects meta-analysis dynamically utilizing the distinct effect sizes securely transmitted directly from five disparate independent nodes.",
            researcher: "Watching your computer screen instantly take five different statistical curves from five different countries and mathematically seamlessly blend them into one perfect global curve.",
            gov: "Programmatically ensuring that the global combined dataset strictly obscures the exact, distinct contribution vectors of any single participating organizational entity.",
            public: "Taking five completely separate, secure summary reports securely from five different cities and quickly stapling them together to perfectly answer a very hard national medical question."
        }
    },
    sdc_output: {
        def: {
            tech: "Extremely rigorous methodological practices involving deliberate data perturbation, granular cell suppression, or algorithmic rounding designed specifically to rigorously prevent adversarial statistical re-identification attacks from aggregated tabulations.",
            researcher: "The careful, systematic process of intentionally blurring your final charts and mathematical tables just enough so that absolutely no one can maliciously guess the identity of any single patient.",
            gov: "The paramount operational control completely underpinning the 'Safe Outputs' principle, serving as the definitive, unyielding fail-safe protecting privacy prior to any external data publication.",
            public: "A very careful security check that intentionally blurs the final math results slightly, making absolutely sure no clever person can ever work backwards to illegally find out who was in the study."
        },
        ex: {
            tech: "Actively applying a strict mathematical rule that algorithmically suppresses any cross-tabulated demographic cohort natively containing fewer than 5 specific individuals (n<5).",
            researcher: "Your software automatically changing a table cell from showing '1 rare patient' to simply showing '<5 patients' to deliberately, fiercely protect that exact person's privacy.",
            gov: "Requiring highly detailed, mathematically auditable system logs unambiguously proving that specific, approved disclosure control algorithms were uniformly applied before any data egress execution.",
            public: "A security guard intently checking a scientist's homework before they leave, actively using a black marker to firmly cross out any tiny numbers that look suspiciously too specific."
        }
    },
    auto_sdc: {
        def: {
            tech: "The programmatic enforcement of statistical disclosure control rules—such as dynamic small-number suppression or differential privacy noise injection—executed natively at compile-time by the analytics engine without manual human intervention.",
            researcher: "A highly advanced software feature that instantly and automatically checks your math results for specific privacy risks before you even see them, explicitly blocking anything dangerous immediately.",
            gov: "A highly scalable, technically deterministic 'Safe Outputs' mitigation strategy fundamentally eliminating dangerous human error and vast administrative bottlenecks from routine algorithmic data egress reviews.",
            public: "A smart computer robot that instantly checks the scientist's final answers with incredible speed, actively automatically deleting any specific numbers that might accidentally reveal exactly who a patient is."
        },
        ex: {
            tech: "DataSHIELD completely aborting a query and throwing an explicit runtime error because a specifically requested scatterplot coordinate dynamically violated the rigid minimum cell density threshold.",
            researcher: "Confidently hitting 'run' on your script and instantly seeing a big red warning message explicitly telling you the software automatically blocked the chart because it was mathematically too disclosive.",
            gov: "The explicit automation of routine algorithmic disclosure checks entirely freeing up the manual Data Access Committee to deliberately focus only on nuanced, high-risk, edge-case qualitative assessments.",
            public: "A fast, automatic spelling-checker that safely immediately blurs out the word 'asthma' if it mathematically calculates that only one single solitary person in the entire hospital actually has it."
        }
    },
    semi_auto_sdc: {
        def: {
            tech: "A hybrid security assurance workflow where preliminary algorithmic scripts mathematically flag potential quantitative disclosure risks, necessitating subsequent qualitative review and explicit approval by an accredited human Information Governance professional.",
            researcher: "A system where a very fast computer does the very first quick security check of your analysis completely, but an actual human expert must then carefully review the tricky parts before you are allowed to specifically publish.",
            gov: "A balanced, highly pragmatic risk management methodology efficiently combining the rapid scale of algorithmic security parsing directly with the nuanced, contextual judgment of trained ethical stewards.",
            public: "A teamwork system where a fast computer highlights anything slightly risky in the scientist's work, and then a smart human safely and carefully double-checks exactly those specific highlights before saying 'yes'."
        },
        ex: {
            tech: "A Python script automatically hashing output tables natively against strict K-anonymity rules and immediately generating a prioritized triage dashboard for the TRE output review team to manually formally inspect.",
            researcher: "The computer quickly approving 90% of your massive quantitative dataset instantly, but deliberately flagging one specific rare disease chart for a human official to manually legally review tomorrow.",
            gov: "An Information Governance protocol strictly mandating formal human sign-off on any algorithmic machine learning model weights, simply because pure mathematical thresholds cannot autonomously thoroughly assess clinical context.",
            public: "An automatic airport metal detector beeping at a specific bag, carefully prompting a trained human security guard to intentionally step forward and carefully look deeply inside just to be completely completely safe."
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
console.log('Definitions updated successfully for part 6');
