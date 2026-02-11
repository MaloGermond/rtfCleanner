import fs from "fs";
import path from "path";

/**
 * Lire le contenu d'un fichier TXT de manière synchrone
 * @param {string} filePath - Chemin vers le fichier TXT
 * @returns {string} Contenu du fichier TXT
 */
export function convertTxtToRTF(filePath, outputDir = "./") {
    // Vérifier si le fichier existe
    if (!fs.existsSync(filePath)) {
        throw new Error(`File "${filePath}" does not exist.`);
    }

    // Vérifier que c'est bien un fichier TXT
    if (!filePath.toLowerCase().endsWith(".txt")) {
        throw new Error(`File "${filePath}" is not a .txt file.`);
    }

    // Lire le contenu du fichier de manière synchrone
    const content = fs.readFileSync(filePath, "utf8");

    const newFileName = path.basename(filePath, ".txt") + ".rtf";
    const outputPath = path.join(outputDir, newFileName);

    fs.writeFile(outputPath, content, (err) => {
        if (err) {
            console.error("Erreur lors de l'écriture du fichier :", err);
            return;
        }
        console.log(`Fichier copié et renommé avec succès : ${outputPath}`);
    });
}
