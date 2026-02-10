#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { version, description } = require("./package.json");

// // Configuration de base
program.name("rtfCleanner").description({ description }).version(version);

try {
    program.parse(process.argv);
} catch (err) {
    console.log(err);
}
