# MongoDB export database to file

Export all collections from a MongoDB database and save on local file (`.json`).

## Get started

Create a `.env` on project root. (Use `.env.example` as example).

Simple run:

```bash
npm install

npm run mongo:backup
```

> This use simple `find({})` operations for each collection. Dangerous for large databases performance! Be careful!