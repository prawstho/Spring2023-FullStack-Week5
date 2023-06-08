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
const path = require('path');
const fsPromise = require('fs').promises;

const {folders, configjson, configtxt, inittxt, usagetxt } = require('./templates')

// Add logging to the CLI project by using eventLogging
// load the logEvents module
const logEvents = require('./logEvents');

// define/extend an EventEmitter class
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};

// initialize an new emitter object
const myEmitter = new MyEmitter();
// add the listener for the logEvent
myEmitter.on('log', (event, level, msg) => logEvents(event, level, msg));

function createFiles() {
    if(DEBUG) console.log('init.createFiles()');
    try { 
        let configdata = JSON.stringify(configjson, null, 2);
        if(!fs.existsSync(path.join(__dirname, './json/config.json'))) {
            fs.writeFile('./json/config.json', configdata, (err) => {
                console.log('Data written to config file');
                myEmitter.emit('log', 'init.createFiles()', 'INFO', 'config.json successfully created.');
            });
        } else {
            myEmitter.emit('log', 'init.createFiles()', 'INFO', 'config.json already exists.'); 
        }     
        if(!fs.existsSync(path.join(__dirname, './views/usage.txt'))) {
            fs.writeFile('./views/usage.txt', usagetxt, (err) => {
                if(DEBUG) console.log('Data written to usage.txt file');
                myEmitter.emit('log', 'init.createFiles()', 'INFO', './views/usage.txt successfully created.');
            });
        } else {
            myEmitter.emit('log', 'init.createFiles()', 'INFO', './views/usage.txt already exists.'); 
        }
        if(!fs.existsSync(path.join(__dirname, './views/init.txt'))) {
            fs.writeFile('./views/init.txt', inittxt, (err) => {
                if(DEBUG) console.log('Data written to init.txt file');
                myEmitter.emit('log', 'init.createFiles()', 'INFO', './views/init.txt successfully created.');
            });
        } else {
            myEmitter.emit('log', 'init.createFiles()', 'INFO', './views/init.txt already exists.'); 
        }
        if(!fs.existsSync(path.join(__dirname, './views/config.txt'))) {
            fs.writeFile('./views/config.txt', configtxt, (err) => {
                if(DEBUG) console.log('Data written to config.txt file');
                myEmitter.emit('log', 'init.createFiles()', 'INFO', './views/config.txt successfully created.');
            });
        } else {
            myEmitter.emit('log', 'init.createFiles()', 'INFO', './views/config.txt already exists.'); 
        }  
    } catch(err) {
        console.log(err);
    }
};

function createFolders() {
    if(DEBUG) console.log('init.createFolders()');
    let mkcount = 0;
    folders.forEach(folder => {
        try {
            if(!fs.existsSync(path.join(__dirname, folder))) {
                fs.mkdirSync(path.join(__dirname, folder));
                if(DEBUG) console.log(`${folder}: ${mkcount}`);
                mkcount++;
            }
        } catch (err) {
            console.log(err);
        }
    });
    if(mkcount === 0) {
        console.log('All folders already exist.');
        myEmitter.emit('log', 'init.createFolders()', 'INFO', 'All folders already existed.');
    } else if (mkcount < folders.length) {
        console.log(mkcount + ' of ' + folders.length + ' folders were created.');
        myEmitter.emit('log', 'init.createFolders()', 'INFO', mkcount + ' of ' + folders.length + ' folders needed to be created.');
    } else {
        console.log('All folders successfully created.');
        myEmitter.emit('log', 'init.createFolders()', 'INFO', 'All folders successfully created.');
    }
};

const myArgs = process.argv.slice(2);
function initializeApp() {
    if(DEBUG) console.log('initializeApp()');
    myEmitter.emit('log', 'init.initializeApp()', 'INFO', 'init option was called by CLI');

    switch (myArgs[1]) {
    case '--all':
    case '--a':
        if(DEBUG) console.log('--all createFolders() & createFiles()');
        createFolders();
        createFiles();
        break;
    case '--cat':
    case '--c':
        if(DEBUG) console.log('--cat createFiles()');
        createFiles();
        break;
    case '--mk':
    case '--m':
        if(DEBUG) console.log('--mk createFolders()');
        createFolders();
        break;
    case '--help':
    case '--h':
    default:
        fs.readFile(__dirname + "/views/init.txt", (error, data) => {
            if(error) throw error;              
            console.log(data.toString());
        });
        myEmitter.emit('log', 'init.initializeApp()', 'WARNING', 'invalid CLI option, usage displayed');
    }
}

module.exports = {
    initializeApp,
}