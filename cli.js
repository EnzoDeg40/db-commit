#!/usr/bin/env node
const mysql = require('mysql');
const fs = require('fs');
require('dotenv').config();

// Grab provided arguments
const [,, ...args] = process.argv;

// If no arguments are provided, print help
if(args.length == 0) {
    console.log('db-commit remove   Remove all files in the database folder');
    console.log('db-commit push     Push all files in the database folder to the database');
    console.log('db-commit pull     Pull all files from the database to the database folder');
    process.exit(0);
}

// If first argument is remove, remove all files in the database folder
if(args[0] == 'remove') {
    const a = require('./remove');
    a();
    process.exit(0);
}

// Print hello world provided arguments
console.log(`Hello world ${args}`);

// Print current working directory
let currentDir = process.cwd();
console.log(currentDir);

// Get the database credentials from the .env file
let dbhost = process.env.DB_HOST;
let dbuser = process.env.DB_USER;
let dbpass = process.env.DB_PASSWORD;
let dbname = process.env.DB_NAME;
let dbport = process.env.DB_PORT || 3306;

// Check if the database credentials are provided or not
if(dbhost == undefined || dbuser == undefined || dbpass == undefined || dbname == undefined) {
    console.log('Please provide a .env file with the following variables: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME');
    process.exit(1);
}

// Try to connect to the database
let sql = mysql.createConnection({
    host: dbhost,
    user: dbuser,
    password: dbpass,
    database: dbname,
    port: dbport
});

sql.connect(function(err) {
    if(err) {
        console.log(err);
        console.log('Could not connect to the database');
        process.exit(1);
    }
    console.log('Connected to the database');
    //process.exit(1);
});

// Create folder if it does not exist
const dir = currentDir + '/database';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

sql.query('SHOW TABLES', function (error, results, fields) {
    if (error) throw error;
    //console.log('The solution is: ', results);
    results.forEach(function(result) {
        let table = result["Tables_in_" + dbname];

        // Create file for each table
        let file = dir + '/' + table + '.sql';
        if (!fs.existsSync(file)){
            // Create file
            fs.appendFile(file, '', function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
        }
    });
});

process.exit(0);