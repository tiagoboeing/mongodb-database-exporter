import chalk from 'chalk'
import { CollectionInfo, Db, MongoClient } from 'mongodb'
import emoji from 'node-emoji'
import { ExecuteConfigs } from './models/execute.model'
import { saveDataToFile } from './utils/path'
require('dotenv').config()

const getCollections = async (db: Db) => db.listCollections().toArray()

const extractCollectionItems = (db: Db, collection: CollectionInfo, query = {}) =>
  db.collection(collection.name).find(query).toArray()

const startColectionBackup = async (
  db: Db,
  collection: CollectionInfo,
  configs: ExecuteConfigs
) => {
  const data = await extractCollectionItems(db, collection)
  console.log(chalk.yellow(`Data extracted from ${collection.name}!`))

  return saveDataToFile(collection.name, data, configs.removeFileBefore, configs.folderPath)
}

const main = async (configs: ExecuteConfigs) => {
  console.dir(
    {
      ...configs.mongoConnection,
      password: String().padEnd(configs.mongoConnection.password.length, '*')
    },
    { depth: 1 }
  )

  const client = new MongoClient(configs.mongoConnection.hostname, {
    auth: {
      username: configs.mongoConnection.username,
      password: configs.mongoConnection.password
    }
  })

  await client.connect()
  console.log(`${chalk.blueBright('Connected successfully to server')} \n`)

  const db = client.db(configs.mongoConnection.database)

  const collections = await getCollections(db)
  if (collections?.length > 0) {
    for (const collection of collections) {
      await startColectionBackup(db, collection, configs)
    }
  }

  client.close()

  return chalk.bgGreen.black(`${emoji.get(':white_check_mark')} All data backup done!`)
}

const execute = async (configs?: ExecuteConfigs) => {
  if (!configs) {
    configs = {
      folderPath: configs?.folderPath || process.env.FOLDER_PATH,
      removeFileBefore: configs?.removeFileBefore || !!process.env.REMOVE_FILE_BEFORE,
      mongoConnection: {
        hostname: configs?.mongoConnection?.hostname || process.env.HOSTNAME || '',
        username: configs?.mongoConnection?.username || process.env.USERNAME || '',
        password: configs?.mongoConnection?.password || process.env.PASSWORD || '',
        database: configs?.mongoConnection?.database || process.env.DATABASE || ''
      }
    }
  }

  return main(configs!).then(console.log).finally().catch(console.error)
}

export default execute
