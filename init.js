/*************************
 * File Name: init.js
 * Purpose: The routines to initialize the app
 * 
 * Commands:
myapp init --all      creates the folder structure and config file
myapp init --mk       creates the folder structure
myapp init --cat      creates the config file with default settings
myapp init --help
 *
 * Created Date: 01 June 2023
 * Authors:
 * PJR - Peter Rawsthorne
 * Revisions:
 * Date, Author, Description
 * 01 June 2023, PJR, File created
 *************************/
// Node.js common core global modules
const fs = require('fs');

const myArgs = process.argv.slice(2);
function initializeApp() {
    if(DEBUG) console.log('initializeApp()');

    switch (myArgs[1]) {
    case '--all':
        if(DEBUG) console.log('--all createFolders() & createFiles()');
        break;
    case '--cat':
        if(DEBUG) console.log('--cat createFiles()');
        break;
    case '--mk':
        if(DEBUG) console.log('--mk createFolders()');
        break;
    case '--help':
    case '--h':
    default:
        fs.readFile(__dirname + "/usage.txt", (error, data) => {
            if(error) throw error;              
            console.log(data.toString());
        });
    }
}

module.exports = {
    initializeApp,
}