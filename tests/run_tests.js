#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Running rtfCleanner tests...\n');

// Test 1: Fichier texte normal
console.log('Test 1: Reading normal text file');
exec('node ' + path.join(__dirname, '../index.js') + ' tests/test.txt', (error, stdout, stderr) => {
    if (error) {
        console.error('❌ Test 1 FAILED:', error.message);
        return;
    }
    if (stdout.includes('fichier de test') && stdout.includes('plusieurs lignes') && stdout.includes('Success! Cleaned content saved')) {
        console.log('✅ Test 1 PASSED: Text file read and saved correctly');
    } else {
        console.error('❌ Test 1 FAILED: Unexpected output');
    }
});

// Test 2: Fichier RTF
setTimeout(() => {
    console.log('\nTest 2: Reading RTF file');
    exec('node ' + path.join(__dirname, '../index.js') + ' tests/test.rtf', (error, stdout, stderr) => {
        if (error) {
            console.error('❌ Test 2 FAILED:', error.message);
            return;
        }
        if (stdout.includes('Test RTF') && stdout.includes('texte en gras') && stdout.includes('Success! Cleaned content saved')) {
            console.log('✅ Test 2 PASSED: RTF file processed and saved correctly');
        } else {
            console.error('❌ Test 2 FAILED: Unexpected output');
        }
    });
}, 100);

// Test 3: Fichier inexistant
setTimeout(() => {
    console.log('\nTest 3: Non-existent file');
    exec('node ' + path.join(__dirname, '../index.js') + ' tests/nonexistent.txt', (error, stdout, stderr) => {
        if (error && stderr.includes('does not exist')) {
            console.log('✅ Test 3 PASSED: Proper error handling for missing file');
        } else {
            console.error('❌ Test 3 FAILED: Should show error for missing file');
        }
    });
}, 200);

// Test 4: Pas d'argument
setTimeout(() => {
    console.log('\nTest 4: No arguments provided');
    exec('node ' + path.join(__dirname, '../index.js'), (error, stdout, stderr) => {
        if (error && stderr.includes('Usage:')) {
            console.log('✅ Test 4 PASSED: Shows usage instructions');
        } else {
            console.error('❌ Test 4 FAILED: Should show usage instructions');
        }
    });
}, 300);

setTimeout(() => {
    console.log('\n✅ All tests completed!');
}, 500);