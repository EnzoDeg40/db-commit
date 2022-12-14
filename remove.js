const fs = require('fs');

function remove() {
    // Print current working directory
    let currentDir = process.cwd();
    console.log(currentDir);
    
    // Read the database folder
    fs.readdir(currentDir, function(err, files) {
        if(err) {
            console.log(err);
        }

        console.log(files);
    });

    console.log('All files removed');
}

module.exports = remove;