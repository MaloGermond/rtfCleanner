#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import { readTxtFile } from "./src/utils/readFile.js";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { version, description } = require("./package.json");

// // Configuration de base
program.name("rtfCleanner").description(description).version(version);

// Commande pour lire un fichier TXT
program
    .command("read-txt")
    .description("Lire le contenu d'un fichier TXT")
    .argument("<path>", "Chemin vers le ficher")
    .action(async (filePath, options) => {
        console.log({ filePath }, { options });
        try {
            const content = await readTxtFile(filePath);
            console.log(chalk.green("=== Contenu du fichier TXT ==="));
            console.log(content);
            console.log(chalk.green("=== Fin du contenu ==="));
        } catch (error) {
            console.error(chalk.red(`Erreur: ${error.message}`));
            process.exit(1);
        }
    });

try {
    program.parse(process.argv);
} catch (err) {
    console.log(err);
}
