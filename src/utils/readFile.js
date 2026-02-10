const filePath = process.argv[2];

// Vérifier si le fichier existe
if (!fs.existsSync(filePath)) {
    console.error(`Error: File "${filePath}" does not exist.`);
    process.exit(1);
}

// Lire le contenu du fichier
fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err.message}`);
        process.exit(1);
    }

    let resultText = "";
    let outputFileName = "";

    // Vérifier si c'est un fichier RTF
    if (filePath.toLowerCase().endsWith(".rtf")) {
        // Extraire le texte brut d'un fichier RTF
        resultText = extractPlainTextFromRTF(data);
        // Créer un nom de fichier de sortie
        outputFileName = filePath.replace(/\.rtf$/i, "_cleaned.txt");
    } else {
        // Utiliser le contenu normalement pour les fichiers texte
        resultText = data;
        // Créer un nom de fichier de sortie
        outputFileName = filePath.replace(/\.txt$/i, "_cleaned.txt");
        // Si ce n'est pas un .txt, ajouter _cleaned.txt
        if (outputFileName === filePath) {
            outputFileName = filePath + "_cleaned.txt";
        }
    }

    // Afficher le résultat
    console.log("=== File Content ===");
    console.log(resultText);
    console.log("\n=== End of Content ===\n");

    // Sauvegarder le résultat dans un fichier
    fs.writeFile(outputFileName, resultText, "utf8", (err) => {
        if (err) {
            console.error(`Error saving file: ${err.message}`);
            process.exit(1);
        }
        console.log(`✅ Success! Cleaned content saved to: ${outputFileName}`);
    });
});

/**
 * Extraire le texte brut d'un contenu RTF
 * @param {string} rtfContent - Contenu RTF
 * @returns {string} Texte brut extrait
 */
function extractPlainTextFromRTF(rtfContent) {
    // Méthode améliorée pour extraire le texte d'un RTF
    // 1. Supprimer les sections de définition (polices, styles, etc.)
    let plainText = rtfContent
        // Supprimer les tables de définition RTF
        .replace(/\\fonttbl[^{}]*{[^}]*}/gi, "")
        .replace(/\\stylesheet[^{}]*{[^}]*}/gi, "")
        .replace(/\\colortbl[^{}]*{[^}]*}/gi, "")
        .replace(/\\info[^{}]*{[^}]*}/gi, "")
        .replace(/\\cocoartf[^{}]*[^}]*/gi, "") // Supprimer les métadonnées cocoartf
        .replace(/\\cocoatextscaling[^{}]*[^}]*/gi, "") // Supprimer cocoatextscaling
        .replace(/\\cocoaplatform[^{}]*[^}]*/gi, "") // Supprimer cocoaplatform
        // Supprimer les commandes RTF complexes
        .replace(/\\([a-z]+)(-?\d+)?[ ]?/gi, (match, cmd) => {
            // Garder les sauts de paragraphe et de ligne
            if (cmd === "par" || cmd === "line") {
                return "\n";
            }
            // Garder les tabulations
            if (cmd === "tab") {
                return "\t";
            }
            // Supprimer les autres commandes
            return "";
        })
        // Gérer les caractères spéciaux et encodages
        .replace(/\\'([0-9a-f]{2})/gi, (_, hex) => {
            return String.fromCharCode(parseInt(hex, 16));
        })
        .replace(/\\u([0-9]+)/gi, (_, dec) => {
            return String.fromCharCode(parseInt(dec, 10));
        })
        // Supprimer les accolades et caractères de contrôle
        .replace(/[{}]/g, "")
        .replace(/[\x00-\x1F\x7F-\x9F]/g, "") // Supprimer les caractères de contrôle
        // Nettoyer les espaces et sauts de ligne
        .replace(/[\s\n]+/g, " ")
        .trim();

    // Si le résultat est vide, contient des séquences hexadécimales ou semble être principalement des commandes,
    // essayer une approche alternative
    if (
        !plainText ||
        /[0-9a-f]{4}/.test(plainText) ||
        (plainText.split(" ").length > 10 &&
            plainText.split(" ").filter((word) => /^[a-z]+\d+$/i.test(word))
                .length >
                plainText.split(" ").length / 2)
    ) {
        // Approche alternative pour les RTF complexes
        const matches = rtfContent.match(/[^{}\\]+(?:\\par|\\line|$)/gi);
        if (matches) {
            plainText = matches
                .map((match) => match.replace(/\\par|\\line/g, "\n"))
                .join(" ")
                .replace(/[\s\n]+/g, " ")
                .trim();
        }

        // Si toujours pas de résultat satisfaisant, essayer une extraction plus agressive
        if (!plainText || plainText.split(" ").length < 5) {
            // Extraire tout ce qui ressemble à du texte entre les commandes
            const textParts = rtfContent.split(/\\[a-z]+/i);
            plainText = textParts
                .filter(
                    (part) => part && part.trim() && !/^[\d\s]+$/.test(part),
                )
                .join(" ")
                .replace(/[\s\n]+/g, " ")
                .replace(/[{}\\]/g, "")
                .trim();
        }

        // Si le résultat contient toujours principalement des commandes, retourner un message approprié
        if (
            plainText &&
            plainText.split(" ").filter((word) => /^[a-z]+\d+$/i.test(word))
                .length >
                plainText.split(" ").length / 2
        ) {
            plainText =
                "[WARNING] This RTF file appears to contain mostly formatting commands with little or no actual text content.\n" +
                "It may be a complex document from a spreadsheet or advanced word processor.\n" +
                "Raw RTF content has been saved for further analysis.";
        }
    }

    return plainText;
}
