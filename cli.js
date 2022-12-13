#!/usr/bin/env node
const mysql = require('mysql');
require('dotenv').config();

// Grab provided arguments
const [,, ...args] = process.argv;

// Print hello world provided arguments
console.log(`Hello world ${args}`);

// Print current working directory
console.log(process.cwd());

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
    process.exit(1);
});
