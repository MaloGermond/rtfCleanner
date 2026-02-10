const fs = require('fs');

/**
 * Lit le contenu d'un fichier
 * @param {string} filePath - Chemin vers le fichier
 * @returns {Promise<string>} Contenu du fichier
 */
async function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

/**
 * Vérifie si un fichier existe
 * @param {string} filePath - Chemin vers le fichier
 * @returns {boolean} True si le fichier existe
 */
function fileExists(filePath) {
    return fs.existsSync(filePath);
}

/**
 * Sauvegarde du contenu dans un fichier
 * @param {string} filePath - Chemin vers le fichier de sortie
 * @param {string} content - Contenu à sauvegarder
 * @returns {Promise<void>}
 */
async function saveFile(filePath, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, content, 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = {
    readFile,
    fileExists,
    saveFile
};