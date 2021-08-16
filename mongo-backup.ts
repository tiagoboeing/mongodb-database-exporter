import chalk from 'chalk'
import { CollectionInfo, Db, MongoClient } from 'mongodb'
import { saveDataToFile } from './utils/path'
import emoji from 'node-emoji'
require('dotenv').config()

/**
 * Migrate a MongoDB database to DynamoDB
 * @summary You need the MongoDB credentials and AWS Cli configurated with credentials
 * @author Tiago Boeing
 */

const envs = {
  hostname: process.env.HOSTNAME,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
}

console.dir(
  {
    ...envs,
    password: String().padEnd(envs.password.length, '*')
  },
  { depth: 1 }
)

const client = new MongoClient(envs.hostname, {
  auth: {
    username: envs.username,
    password: envs.password
  }
})

async function getCollections(db: Db) {
  return db.listCollections().toArray()
}

function extractCollectionItems(db: Db, collection: CollectionInfo, query = {}) {
  return db.collection(collection.name).find(query).toArray()
}

async function startColectionBackup(db: Db, collection: CollectionInfo) {
  const data = await extractCollectionItems(db, collection)
  console.log(chalk.yellow(`Data extracted from ${collection.name}!`))

  return saveDataToFile(collection.name, data)
}

async function main() {
  await client.connect()
  console.log(`${chalk.blueBright('Connected successfully to server')} \n`)

  const db = client.db(envs.database)

  const collections = await getCollections(db)
  if (collections?.length > 0) {
    for (const collection of collections) {
      await startColectionBackup(db, collection)
    }
  }

  client.close()

  return chalk.bgGreen.black(`${emoji.get(':white_check_mark')} All data backup done!`)
}

main().then(console.log).finally().catch(console.error)
