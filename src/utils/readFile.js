import fs from "fs";

/**
 * Lire le contenu d'un fichier TXT de manière synchrone
 * @param {string} filePath - Chemin vers le fichier TXT
 * @returns {string} Contenu du fichier TXT
 */
export function readTxtFile(filePath) {
    // Vérifier si le fichier existe
    if (!fs.existsSync(filePath)) {
        throw new Error(`File "${filePath}" does not exist.`);
    }

    // Vérifier que c'est bien un fichier TXT
    if (!filePath.toLowerCase().endsWith(".txt")) {
        throw new Error(`File "${filePath}" is not a .txt file.`);
    }

    // Lire le contenu du fichier de manière synchrone
    return fs.readFileSync(filePath, "utf8");
}
