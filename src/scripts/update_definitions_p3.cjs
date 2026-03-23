const fs = require('fs');

const payload = {
    fed_infra: {
        def: {
            tech: "The localized hardware architectures and cloud enclaves provisioning both the persistent storage of health data and the ephemeral, isolated compute environments required for secure analysis.",
            researcher: "The physical servers, secure cloud networks, and processing power provided by an institution so that you can actually store data and run your mathematical models safely.",
            gov: "The managed technical environments that must adhere to stringent physical and digital security controls (e.g. ISO 27001), representing the ultimate perimeter of the institution's risk envelope.",
            public: "The highly secure computers, servers, and networks where the data physically lives, and the processing power used to run the math on that data."
        },
        ex: {
            tech: "A secure AWS Virtual Private Cloud enclave partitioned to completely separate the data storage layer from the EC2 compute instance layer.",
            researcher: "Logging into the university's high-performance cluster to securely use its 100 CPUs for your complex genetics analysis.",
            gov: "An annual independent penetration test explicitly required to renew the facility's accreditation before any new data can be loaded.",
            public: "A secure, windowless server room at the hospital keeping all patient records completely locked away from the public internet."
        }
    },
    remote_vm: {
        def: {
            tech: "The provisioning of isolated, containerized Virtual Desktop Infrastructures (VDIs) or Trusted Research Environments (TREs) that rigorously prevent data exfiltration while enabling remote interaction via secure rendering layers.",
            researcher: "A highly locked-down computer desktop you access over the internet, where you can see and analyze data, but simply cannot copy, paste, or download anything to your own laptop.",
            gov: "A technical control enforcing the 'Safe Settings' principle by entirely removing the endpoint device (the researcher's personal computer) from the data security perimeter.",
            public: "Working with secure data through a special window on your computer screen, where it is impossible to copy, print, or save the data to your own machine."
        },
        ex: {
            tech: "Accessing a Citrix Workspace session where outbound port 80/443 traffic, clipboard sharing, and local drive mapping have been permanently disabled by group policy.",
            researcher: "Using a remote desktop app from your living room to run RStudio on a dataset stored securely at the national statistics office.",
            gov: "A strict policy ensuring that even if a researcher's laptop is stolen, zero data is compromised because no data was ever actually stored on their device.",
            public: "Watching a secure movie on an airplane screen—you can view it fully, but you have absolutely no way to take the file home with you."
        }
    },
    phy_access: {
        def: {
            tech: "Strict physical isolation, colloquially known as air-gapped secure rooms ('safe rooms'), mandating monitored physical on-site presence, completely neutralizing remote network-borne exfiltration vectors.",
            researcher: "Having to travel in person to a specific, highly secure room at a university or government building to sit down at a dedicated computer terminal just to run your analysis.",
            gov: "The ultimate draconian risk mitigation strategy for exceptionally sensitive datasets, relying heavily on physical building security and strictly monitored human supervision.",
            public: "Requiring a researcher to physically travel to a guarded, lock-and-key room at the hospital or government office just to look at the data safely."
        },
        ex: {
            tech: "A computing terminal completely severed from the external internet, featuring structurally deactivated USB ports and local-only network topography.",
            researcher: "Swiping a biometric ID card to enter a windowless room so you can type your queries into a desktop that isn't connected to the outside world.",
            gov: "Maintaining an immutable physical logbook and CCTV recordings precisely documenting every individual who entered the room and for how exactly long.",
            public: "A desktop computer locked in a highly secure room at the national statistics office, deliberately built with no internet connection and no USB ports."
        }
    },
    fed_storage: {
        def: {
            tech: "A distributed persistent storage paradigm where multiple, heterogeneous, and physically separate storage nodes are virtually orchestrated and queried as a single, coherent logical namespace across different geographic boundaries.",
            researcher: "A setup where many different hospitals' hard drives are connected through software so you can search them all at once, even though the data is scattered everywhere.",
            gov: "Coordinating decentralized data assets across multiple legal entities into a unified catalog, massively shifting the risk burden away from a central target to the sovereign node operators.",
            public: "A structured system where files stay exactly where they were born, but a smart computer network knows exactly where everything is so it can all be searched quickly."
        },
        ex: {
            tech: "Federated S3 buckets orchestrating cross-region replication logic to maintain a unified metadata graph while respecting distinct cryptographic encryption boundaries.",
            researcher: "Opening a single folder on your secure desktop that seamlessly lists millions of health records that actually live in 20 different global cities.",
            gov: "The Data Controller at Site A signing a master agreement that strictly limits read-only metadata access to Site B, without ever transferring actual file payloads.",
            public: "Connecting secure hard drives from different hospitals into one seamless network directory accessible only by fully permitted researchers."
        }
    },
    decentralised_storage: {
        def: {
            tech: "An architectural stance explicitly mandating that data payloads stubbornly reside at their point of origin; all authorization and processing workflows must dynamically route computational requests to the independent, sovereign storage nodes.",
            researcher: "A strict rule dictating that you must send your analysis code to the exact hospital where the data lives, rather than asking them to send their data to you.",
            gov: "The absolute maximization of institutional sovereignty and local accountability, requiring every single data use to continually pass local, independent checks.",
            public: "Locally collected data is stored securely in its local hospital. Access to any part of this data is strictly controlled by the local people who actually collected it."
        },
        ex: {
            tech: "A containerized processing engine dynamically instantiating at the local edge node, reading local parquet files, and returning only deeply aggregated statistics.",
            researcher: "Sending your statistical Python script to five different hospitals simultaneously, precisely because they refuse to move their patient data to a central location.",
            gov: "The autonomous Data Access Committee at a specific hospital retaining the absolute, unilateral right to reject a query, despite overriding national consortium approval.",
            public: "A local hospital keeping its own patient records heavily guarded on-site, but safely allowing an approved math formula to temporarily query them."
        }
    },
    central_storage: {
        def: {
            tech: "The practice of ingesting, transporting, and physically pooling data copies from myriad disparate sources into a single, monolithic database; this model is diametrically opposed to the principles of federation.",
            researcher: "Copying everyone's data into one massive, central database. While highly convenient for analysis, it fundamentally strips control away from the original data owners.",
            gov: "Consolidating immense cyber-security risk and absolute stewardship responsibility into a singular entity, breaking local control and creating a high-value centralized liability.",
            public: "Taking huge amounts of data from lots of different places and pouring it all into one giant, central bucket. This is exactly what a true federation tries to avoid."
        },
        ex: {
            tech: "Setting up a continuous ETL pipeline to forcefully duplicate relational rows from 10 hospital SQL instances into one massive, centralized Snowflake data warehouse in the cloud.",
            researcher: "Running a query that takes just seconds because all 50 million global health records have been conveniently collected on one massive computer system.",
            gov: "An overarching legal mandate standardizing all historical formats and indemnifying the central host for any sweeping, systemic data breaches.",
            public: "Copying every single citizen's local patient records into a massive, national cloud database securely controlled by just one company."
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
console.log('Definitions updated successfully for part 3');
