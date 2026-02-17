const fs = require("fs");
const path = require("path");

function parsePubMed() {
    const dataPath = path.join(__dirname, "../_data/pubmed-jobdekker-set.txt");
    const outputPath = path.join(__dirname, "../_data/publications.json");

    console.log(`Reading from ${dataPath}`);
    const fileContent = fs.readFileSync(dataPath, "utf8");

    const publications = [];
    let currentPub = {};
    let currentField = null;

    const lines = fileContent.split("\n");

    lines.forEach((line) => {
        if (!line.trim()) {
            if (Object.keys(currentPub).length > 0) {
                publications.push(currentPub);
                currentPub = {};
                currentField = null;
            }
            return;
        }

        const match = line.match(/^([A-Z]+)\s*-\s(.*)/);

        if (match) {
            const key = match[1];
            const value = match[2];
            currentField = key;

            if (currentPub[key]) {
                if (Array.isArray(currentPub[key])) {
                    currentPub[key].push(value);
                } else {
                    currentPub[key] = [currentPub[key], value];
                }
            } else {
                if (key === "FAU" || key === "AU") {
                    currentPub[key] = [value];
                } else {
                    currentPub[key] = value;
                }
            }

            if (key === "DP") {
                const yearMatch = value.match(/\d{4}/);
                if (yearMatch) {
                    currentPub.year = yearMatch[0];
                }
            }

        } else if (currentField) {
            const trimmedLine = line.trim();
            if (trimmedLine) {
                if (Array.isArray(currentPub[currentField])) {
                    currentPub[currentField][currentPub[currentField].length - 1] += " " + trimmedLine;
                } else {
                    currentPub[currentField] += " " + trimmedLine;
                }
            }
        }
    });

    if (Object.keys(currentPub).length > 0) {
        publications.push(currentPub);
    }

    // Sort descending by date
    publications.sort((a, b) => {
        const dateA = new Date(a.DP);
        const dateB = new Date(b.DP);
        if (isNaN(dateA)) return 1;
        if (isNaN(dateB)) return -1;
        return dateB - dateA;
    });

    console.log(`Parsed ${publications.length} publications.`);
    fs.writeFileSync(outputPath, JSON.stringify(publications, null, 2));
    console.log(`Written to ${outputPath}`);
}

parsePubMed();
