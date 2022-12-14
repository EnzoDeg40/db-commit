# db-commit [WIP]
 
This package allows you to manage database migrations in NodeJS projects using SQL type migration files (like doctrine for example). It uses the package [mysql](https://www.npmjs.com/package/mysql) to connect to the database.

This package is still in development, it is not yet ready to be used.

## Installation

```bash
npm install db-commit
```

// .env
If you

## Usage

Generate SQL files in `database` folder
```bash
db-commit pull
```

Apply SQL files in `database` folder
```bash
db-commit push
```

Remove SQL files in `database` folder
```bash
db-commit remove
```
