#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import fs from "fs";
import { convertTxtToRTF } from "./src/utils/convertFile.js";
import { cleanRtf } from "./src/utils/rtfgrooming.js";
import { readRtfFile, readJsonFile } from "./src/utils/readFile.js";

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

program
    .command("rtfClean")
    .description("Format et nettoie de contenu du rtf")
    .argument("<path>", "Chemin vers le fichier RTF à convertir")
    .option(
        "-o, --output <path>",
        "Chemin vers le fichier RTF de sortie (facultatif)",
    )
    .option("-c, --config <path>", "Chemin vers le fichier de config")
    .action(async (filePath, options) => {
        console.log({ filePath }, { options });
        try {
            const content = await readRtfFile(filePath);
            const rules = await readJsonFile(options?.config);
            const regex = new RegExp(rules[0].regex, "gm");
            // console.log(content.replaceAll(regex, rules[0].replace));
            let outputFile = content;
            // console.log(options?.output);
            rules
                .filter((el) => el?.enable)
                .map((el) => {
                    console.log({ el });
                    const regex = new RegExp(el.regex, "gm");
                    outputFile = outputFile.replaceAll(regex, el.replace);
                });

            fs.writeFile(options?.output, outputFile, (err) => {
                if (err) {
                    console.error(
                        "Erreur lors de l'écriture du fichier :",
                        err,
                    );
                    return;
                }
                console.log(
                    `Fichier copié et renommé avec succès : ${options?.output}`,
                );
            });

            // await cleanRtf(content, );
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
