#!/usr/bin/env node
const mysql = require('mysql');
const fs = require('fs');
require('dotenv').config();

// Grab provided arguments
const [,, ...args] = process.argv;

function printHelp(){
    console.log('db-commit remove   Remove all files in the database folder');
    console.log('db-commit push     Push all files in the database folder to the database');
    console.log('db-commit pull     Pull all files from the database to the database folder');
    console.log('db-commit help     Print this help message');
}

// If no arguments are provided, print help
if(args.length == 0 || args[0] == 'help') {
    printHelp();
    process.exit(0);
}

// If first argument is remove, remove all files in the database folder
if(args[0] == 'remove') {
    const rm = require('./remove');
    rm();
    process.exit(0);
}

// Get the database credentials from the .env file
let dbhost = process.env.DB_HOST;
let dbuser = process.env.DB_USER;
let dbpass = process.env.DB_PASSWORD;
let dbname = process.env.DB_NAME;
let dbport = process.env.DB_PORT || 3306;

// Check if the database credentials are provided or not
if(dbhost == undefined || dbuser == undefined || dbpass == undefined || dbname == undefined) {
    console.log('Please provide a .env file with the following variables: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME. DB_PORT is optional.');
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
});


// Create folder if it does not exist
const currentDir = process.cwd();
const dir = currentDir + '/database';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

if(args[0] == 'pull') {
    // Get all tables from the database
    sql.query('SHOW TABLES', function (error, results, fields) {
        if (error) throw error;

        console.log(results.length + ' tables found in database');

        // Loop through all tables
        results.forEach(function(result) {

            // Set table name and file name
            let table = result["Tables_in_" + dbname];
            let file = dir + '/' + table + '.sql';

            // Get the create table query
            sql.query('SHOW CREATE TABLE ' + table, function (error, results, fields) {
                if (error) throw error;
                
                // Write the create table query to the file
                fs.writeFile(file, results[0]['Create Table'] + ";\n\n", function (err) {
                    if (err) throw err;
                    console.log('Working on ' + table);
                });
            });
        });
    });
}

