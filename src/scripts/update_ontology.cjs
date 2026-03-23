const fs = require('fs');
const filepath = 'c:/Users/dalew/Downloads/ppie-insights-tool (1)/src/data/ontology.ts';
let content = fs.readFileSync(filepath, 'utf8');

if (!content.includes('essential_characteristics')) {
    content = content.replace(
        'tags?: FrameworkTag[];',
        'tags?: FrameworkTag[];\n    essential_characteristics?: string[];'
    );

    const matchAndReplace = (idMatch, characteristics) => {
        const regex = new RegExp(`(id:\\s*"${idMatch}"[\\s\\S]*?example:\\s*".*?",)`);
        content = content.replace(regex, `$1\n        essential_characteristics: ${JSON.stringify(characteristics)},`);
    };

    matchAndReplace("fed_ecosystem", ["Distributed infrastructure mapping exists", "Multi-party governance agreements signed"]);
    matchAndReplace("fed_people", ["Roles and responsibilities documented", "Training logs available for all users"]);
    matchAndReplace("fed_data", ["Metadata catalog accessible via API", "Standardized data dictionaries maintained"]);
    matchAndReplace("fed_storage", ["Storage endpoints reachable via secure protocols", "Availability SLA > 99%"]);
    matchAndReplace("decentralised_storage", ["Data never leaves local network boundaries", "Local DAC approval logged for all queries"]);
    matchAndReplace("central_storage", ["Single physical storage location verified", "Data ingestion pipelines audited"]);
    matchAndReplace("fed_analytics", ["Analytics code executes locally at endpoints", "Only aggregate results transmitted back"]);
    matchAndReplace("smpc", ["Cryptographic protocol verified (e.g., Shamir secret sharing)", "Zero knowledge of distinct individual data maintained mathematically"]);
    matchAndReplace("fed_gov", ["Legal basis for data processing established", "Data Processing Agreements (DPAs) active"]);
    matchAndReplace("access_process", ["Time-to-access measured", "Number of approved vs rejected applications tracked"]);
    matchAndReplace("dacs", ["Committee meetings minuted", "Lay/public representation on committee verified"]);
    matchAndReplace("fed_infra", ["ISO27001 or equivalent certification valid", "Penetration testing conducted annually"]);
    matchAndReplace("remote_vm", ["Clipboard and internet access disabled", "Session times and commands logged"]);
    matchAndReplace("phy_access", ["Biometric or keycard access logs maintained", "CCTV monitoring at physical access points"]);
    matchAndReplace("fed_access", ["Federated Identity Management (e.g. OAuth/OIDC) used", "MFA enforcement rate 100%"]);
    matchAndReplace("ds_simul", ["Execution time identical across nodes", "All node results combined automatically"]);
    matchAndReplace("datashield", ["DataSHIELD instance running v6.0+", "Disclosure checks pass standard DS logic"]);
    matchAndReplace("sep_analysis", ["Asynchronous results collection visible", "Local node isolation maintained"]);
    matchAndReplace("trevolution", ["TREvolution API response times logged", "Cross-TRE API keys mapped"]);
    matchAndReplace("tes", ["GA4GH TES API endpoints active", "Job execution status codes trackable"]);
    matchAndReplace("ohdsi", ["OMOP CDM version 5.3+ validated", "Data quality dashboard scores > 90%"]);
    matchAndReplace("opensafely", ["OpenSAFELY backend execution recorded", "SQL query suppression flags triggered when N<5"]);
    matchAndReplace("sdc_output", ["Small cell counts strictly suppressed (<10)", "Output rounding rules systematically applied"]);
    matchAndReplace("auto_sdc", ["Algorithmic suppression logs available", "0 human interventions needed for basic outputs"]);
    matchAndReplace("semi_auto_sdc", ["Human review timestamps logged", "Approval rationale documented per output release"]);
    matchAndReplace("fed_outputs", ["Consolidated final hash sum verified", "No raw individual patient data included in export object"]);
    matchAndReplace("research_outputs", ["Digital Object Identifier (DOI) assigned", "Associated methodology published openly"]);
    matchAndReplace("intermediate_outputs", ["Outputs restricted to authenticated session only", "Deleted automatically after 30 days"]);
    matchAndReplace("final_outputs", ["Cleared through institutional comms team", "Available publicly without authentication barrier"]);

    fs.writeFileSync(filepath, content);
    console.log('Updated ontology.ts completely.');
} else {
    console.log('Already updated.');
}
