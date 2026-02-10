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
    
    let resultText = '';
    let outputFileName = '';
    
    // Vérifier si c'est un fichier RTF
    if (filePath.toLowerCase().endsWith('.rtf')) {
        // Extraire le texte brut d'un fichier RTF
        resultText = extractPlainTextFromRTF(data);
        // Créer un nom de fichier de sortie
        outputFileName = filePath.replace(/\.rtf$/i, '_cleaned.txt');
    } else {
        // Utiliser le contenu normalement pour les fichiers texte
        resultText = data;
        // Créer un nom de fichier de sortie
        outputFileName = filePath.replace(/\.txt$/i, '_cleaned.txt');
        // Si ce n'est pas un .txt, ajouter _cleaned.txt
        if (outputFileName === filePath) {
            outputFileName = filePath + '_cleaned.txt';
        }
    }
    
    // Afficher le résultat
    console.log('=== File Content ===');
    console.log(resultText);
    console.log('\n=== End of Content ===\n');
    
    // Sauvegarder le résultat dans un fichier
    fs.writeFile(outputFileName, resultText, 'utf8', (err) => {
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
        // Supprimer la table des polices
        .replace(/\\fonttbl[^{}]*{[^}]*}/gi, '')
        // Supprimer la table des styles
        .replace(/\\stylesheet[^{}]*{[^}]*}/gi, '')
        // Supprimer la table des couleurs
        .replace(/\\colortbl[^{}]*{[^}]*}/gi, '')
        // Supprimer les informations de document
        .replace(/\\info[^{}]*{[^}]*}/gi, '')
        // Supprimer les commandes RTF qui ne sont pas du texte
        .replace(/\\([a-z]+)(-?\d+)?[ ]?/gi, (match, cmd) => {
            // Garder les sauts de paragraphe et de ligne
            if (cmd === 'par' || cmd === 'line') {
                return '\n';
            }
            // Garder les tabulations
            if (cmd === 'tab') {
                return '\t';
            }
            // Supprimer les autres commandes
            return '';
        })
        // Supprimer les caractères spéciaux RTF
        .replace(/\\'([0-9a-f]{2})/gi, (_, hex) => {
            return String.fromCharCode(parseInt(hex, 16));
        })
        // Supprimer les accolades restantes
        .replace(/[{}]/g, '')
        // Nettoyer les espaces multiples et sauts de ligne
        .replace(/[\s\n]+/g, ' ')
        .trim();
    
    return plainText;
}