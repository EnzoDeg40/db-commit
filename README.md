# db-commit [WIP]
 
This package allows you to manage database migrations in NodeJS projects using SQL type migration files (like [doctrine](https://www.doctrine-project.org/) for example). It uses the package [mysql](https://www.npmjs.com/package/mysql) to connect to the database.

## Installation

```bash
npm install -g db-commit
npm link db-commit
```

Create a .env file in the root of your project with the following content. `DB_PORT` is optional.
```bash
DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD="password"
DB_NAME="my_database"
DB_PORT="3306" 
```

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
