#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import { convertTxtToRTF } from "./src/utils/convertFile.js";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { version, description } = require("./package.json");

// // Configuration de base
program.name("rtfCleanner").description(description).version(version);

// Commande pour lire un fichier TXT
program
    .command("TxtToRtf")
    .description("Convertis un fichier TXT en RTF")
    .argument("<path>", "Chemin vers le fichier TXT à convertir")
    .option(
        "-o, --output <path>",
        "Chemin vers le fichier RTF de sortie (facultatif)",
    )
    .action(async (filePath, options) => {
        console.log({ filePath }, { options });
        try {
            await convertTxtToRTF(filePath, options?.output);
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
