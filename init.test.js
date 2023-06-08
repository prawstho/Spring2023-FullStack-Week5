const fs = require('fs');
const path = require('path');

const {folders} = require('./templates')

describe('all the folders were created', () => {
  // Check if the folder exists
  folders.forEach(folder => {
    test(`${folder} folder exists`, () => { 
      const folderExists = fs.existsSync(path.join(__dirname, folder));
      expect(folderExists).toBe(true);
    });
  });
});