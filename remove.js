const fs = require('fs');

function remove() {
    // Print current working directory
    let currentDir = process.cwd();
    console.log(currentDir);
    
    // Remove the database folder
    fs.rmdirSync(currentDir + '/database', { recursive: true });
}

module.exports = remove;