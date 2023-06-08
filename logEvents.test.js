// global.DEBUG will also be required for all tests
// we are not running the myapp.js so global.DEBUG is not set
global.DEBUG = false;

// load the logEvents module
const logEvents = require('./logEvents');
// define/extend an EventEmitter class
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};
// initialize an new emitter object
const myEmitter = new MyEmitter();
// add the listener for the logEvent
myEmitter.on('log', (event, level, msg) => logEvents(event, level, msg));

const { format, getYear, getTime } = require('date-fns');
//const fsPromises = require('fs').promises;
const fs = require('fs');
const path = require('path');

test('Entry was successfully added to log file', async () => {
  // grab the timestamp and include with msg text
  const currTimeMsg = 'This test event occured at ' + getTime(new Date());
  // write the log entry
  myEmitter.emit('log', 'http://localhost', 'TEST', currTimeMsg);
  // read the file for specific msg text
  const logsFolder = './logs/' + getYear(new Date());
  const fileName = `${format(new Date(), 'yyyyMMdd')}` + '_http_events.log';
  fs.readFile(path.join(__dirname, logsFolder, fileName),'utf-8', function(err, data){
    expect(data.includes(currTimeMsg)).toBeTruthy();
  });
});
