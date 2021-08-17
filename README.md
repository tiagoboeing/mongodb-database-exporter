# MongoDB export database to file

Export all collections from a MongoDB database and save on local file (`.json`).

> This use simple `find({})` operations for each collection. Dangerous for large databases performance! Be careful!

## Get started

`.env` file is the default strategy to resolve values. When you pass a `configs` on `execute()` this will be used.

### As command line

Create a `.env` on project root. (Use `.env.example` as example).

Simple run:

```bash
npm install

npm start
```

You can make changes on `src/index.ts` to pass parameters without using DotEnv.