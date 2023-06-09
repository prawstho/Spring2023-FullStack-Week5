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

// Node.js common core global modules
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const { configjson } = require('./templates');

const myArgs = process.argv.slice(2);

function displayConfig() {
  if(DEBUG) console.log('config.displayConfig()');
  fs.readFile(__dirname + "/json/config.json", (error, data) => {
      if(error) throw error;     
      console.log(JSON.parse(data));
  });
  myEmitter.emit('log', 'config.displayConfig()', 'INFO', 'config.json displayed');
}

function resetConfig() {
  if(DEBUG) console.log('config.resetConfig()');
  let configdata = JSON.stringify(configjson, null, 2);
  fs.writeFile(__dirname + '/json/config.json', configdata, (error) => {
      if(error) throw error;   
      if(DEBUG) console.log('Config file reset to original state');
      myEmitter.emit('log', 'config.resetConfig()', 'INFO', 'config.json reset to original state.');
  });
}

function setConfig() {
  if(DEBUG) console.log('config.setConfig()');
  if(DEBUG) console.log(myArgs);
  let match = false;
  fs.readFile(__dirname + "/json/config.json", (error, data) => {
      if(error) throw error;         
      if(DEBUG) console.log(JSON.parse(data));
      let cfg = JSON.parse(data);
      for(let key of Object.keys(cfg)){
          if(key === myArgs[2]) {
              cfg[key] = myArgs[3];
              match = true;
          }
      }
      if(!match) {
          console.log(`invalid key: ${myArgs[2]}, try another.`)
          myEmitter.emit('log', 'config.setConfig()', 'WARNING', `invalid key: ${myArgs[2]}`);
      }
      if(DEBUG) console.log(cfg);
      data = JSON.stringify(cfg, null, 2);
      fs.writeFile(__dirname + '/json/config.json', data, (error) => {
          if (error) throw error;
          if(DEBUG) console.log('Config file successfully updated.');
          myEmitter.emit('log', 'config.setConfig()', 'INFO', `config.json "${myArgs[2]}": updated to "${myArgs[3]}"`);
      });
  });
}

function configApp() {
  if(DEBUG) console.log('configApp()');
  myEmitter.emit('log', 'config.configApp()', 'INFO', 'config option was called by CLI');

  switch (myArgs[1]) {
  case '--show':
      displayConfig();
      break;
  case '--reset':
      resetConfig();
      break;
  case '--set':
      if (myArgs.length < 4) {
          console.log('invalid syntax. node myapp config --set [attribute] [new value]')
          myEmitter.emit('log', 'config.configApp() --set', 'WARNING', 'invalid syntax, usage displayed');
      } else {
          setConfig();
      }
      break;
  case '--help':
  case '--h':
  default:
      fs.readFile(__dirname + "/views/config.txt", (error, data) => {
          if(error) throw error;              
          console.log(data.toString());
      });
      myEmitter.emit('log', 'config.configApp()', 'INFO', 'invalid CLI option, usage displayed');
  }
}

module.exports = {
  configApp,
}