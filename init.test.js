// global.DEBUG will also be required for all tests with DEBUG 
// we are not running the myapp.js so global.DEBUG is not set
global.DEBUG = false;

const fs = require('fs');
const path = require('path');

const init = require('./init.js');
const {folders} = require('./templates')

beforeAll(() => {
  // create all the folders
  init.createFolders();
  // create all the files
});

describe('all the folders were created', () => {
  // Check if the folders were created
  folders.forEach(folder => {
    test(`${folder} folder exists`, () => { 
      const folderExists = fs.existsSync(path.join(__dirname, folder));
      expect(folderExists).toBe(true);
    });
  });
});

afterAll(() => {
  // remove all the folders
  folders.forEach(folder => {
    fs.rmSync(path.join(__dirname, folder), { recursive: true });
  });
});