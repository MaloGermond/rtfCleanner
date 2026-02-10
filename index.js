#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Vérifier si un argument est fourni
if (process.argv.length < 3) {
    console.error('Usage: node index.js <file_path>');
    process.exit(1);
}

