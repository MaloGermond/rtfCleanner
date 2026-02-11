import fs from "fs";
import chalk from "chalk";

/**
 * Lire le contenu d'un fichier TXT de manière synchrone
 * @param {string} filePath - Chemin vers le fichier TXT
 * @returns {string} Contenu du fichier TXT
 */
export function readTxtFile(filePath, verbose = false) {
    // Vérifier si le fichier existe
    if (!fs.existsSync(filePath)) {
        throw new Error(`File "${filePath}" does not exist.`);
    }

    // Vérifier que c'est bien un fichier TXT
    if (!filePath.toLowerCase().endsWith(".txt")) {
        throw new Error(`File "${filePath}" is not a .txt file.`);
    }

    const content = fs.readFile(filePath, "utf8");

    if (verbose) {
        console.log(chalk.green("=== Contenu du fichier TXT ==="));
        console.log(content);
        console.log(chalk.green("=== Fin du contenu ==="));
    }

    // Lire le contenu du fichier de manière synchrone
    return content;
}

export function readRtfFile(filePath, verbose = false) {
    // Vérifier si le fichier existe
    if (!fs.existsSync(filePath)) {
        throw new Error(`File "${filePath}" does not exist.`);
    }

    // Vérifier que c'est bien un fichier TXT
    if (!filePath.toLowerCase().endsWith(".rtf")) {
        throw new Error(`File "${filePath}" is not a .rtf file.`);
    }

    const content = fs.readFileSync(filePath, "utf8");

    if (verbose) {
        console.log(chalk.green("=== Contenu du fichier TXT ==="));
        console.log(content);
        console.log(chalk.green("=== Fin du contenu ==="));
    }

    // Lire le contenu du fichier de manière synchrone
    return content;
}

export function readJsonFile(filePath, verbose = false) {
    // Vérifier si le fichier existe
    if (!fs.existsSync(filePath)) {
        throw new Error(`File "${filePath}" does not exist.`);
    }

    // Vérifier que c'est bien un fichier TXT
    if (!filePath.toLowerCase().endsWith(".json")) {
        throw new Error(`File "${filePath}" is not a .json file.`);
    }

    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (verbose) {
        console.log(chalk.green("=== Contenu du fichier TXT ==="));
        console.log({ content });
        console.log(chalk.green("=== Fin du contenu ==="));
    }

    // Lire le contenu du fichier de manière synchrone
    return content;
}
