#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Vérifier si un argument est fourni
if (process.argv.length < 3) {
    console.error('Usage: node index.js <file_path>');
    process.exit(1);
}

const filePath = process.argv[2];

// Vérifier si le fichier existe
if (!fs.existsSync(filePath)) {
    console.error(`Error: File "${filePath}" does not exist.`);
    process.exit(1);
}

// Lire le contenu du fichier
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err.message}`);
        process.exit(1);
    }
    
    console.log(data);
});