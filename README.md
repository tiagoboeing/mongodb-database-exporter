# MongoDB export database to file

![npm (scoped)](https://img.shields.io/npm/v/@tiagoboeing/mongodb-database-exporter?style=for-the-badge) ![npm](https://img.shields.io/npm/dm/@tiagoboeing/mongodb-database-exporter?style=for-the-badge) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/@tiagoboeing/mongodb-database-exporter?style=for-the-badge) ![NPM](https://img.shields.io/npm/l/@tiagoboeing/mongodb-database-exporter?style=for-the-badge)

Export all collections from a MongoDB database and save on local file (`.json`).

## Supported platforms

| Platform | Supported                 |
| -------- | ------------------------- |
| NodeJS   | Yes                       |
| Browser  | No (created for terminal) |

> This use simple `find({})` operations for each collection. Dangerous for large databases performance! Be careful!

## Get started

### NPM

Install:

```bash
npm i @tiagoboeing/mongodb-database-exporter --save-dev
```

Use in your JS/TS:

```js
// ES6 syntax (recommended)
import mongoDBExporter from '@tiagoboeing/mongodb-database-exporter/dist/mongo-exporter'
mongoDBExporter.execute()

// ES5 syntax
const { mongoDBExporter } = require('@tiagoboeing/mongodb-database-exporter/dist/mongo-exporter')
mongoDBExporter.execute()
```

### Running locally

`.env` file is the default strategy to resolve values. When you pass a `configs` on `execute()` this will be used.

#### As command line

Create a `.env` on project root. (Use `.env.example` as example).

Simple run:

```bash
npm install

npm start
```

You can make changes on `src/index.ts` to pass parameters without using DotEnv.

## Available properties

| SDK property               | .env property        | Type      | Description                                                           | Required | Default               |
| -------------------------- | -------------------- | --------- | --------------------------------------------------------------------- | -------- | --------------------- |
| `folderPath`               | `FOLDER_PATH`        | `string`  | Change default folder path to save files. Failed if folder not found! | No       | `%PROJECT_ROOT%/data` |
| `removeFileBefore`         | `REMOVE_FILE_BEFORE` | `boolean` | Remove matches files on folder before save.                           | No       | `true`                |
| `mongoConnection.hostname` | `HOSTNAME`           | `string`  | MongoDB hostname to connect.                                          | Yes      | N/A                   |
| `mongoConnection.username` | `USERNAME`           | `string`  | MongoDB username.                                                     | Yes      | N/A                   |
| `mongoConnection.password` | `PASSWORD`           | `string`  | MongoDB password.                                                     | Yes      | N/A                   |
| `mongoConnection.database` | `DATABASE`           | `string`  | MongoDB database to select.                                           | Yes      | N/A                   |
