import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { promisify } from 'util'

export const DEFAULT_FOLDER = path.resolve(__dirname, '../../data')

export async function clearFolder (folderPath?: string) {
  chalk.yellow(`Removing ".json" files on folder: "${folderPath}"`)
  if (!folderPath) folderPath = DEFAULT_FOLDER

  const folderFiles = fs.readdirSync(folderPath)

  return folderFiles.forEach(async file => {
    const fileType = file.split('.').pop()

    if (fileType === 'json') {
      return promisify(fs.rmSync)(path.resolve(folderPath!, file), {
        recursive: true,
        force: true
      })
    } else {
      console.log(chalk.gray(`File skipped ${file}`))
    }

    return file
  })
}

export async function removeFile (fullPath: string) {
  try {
    return promisify(fs.rm)(fullPath, {
      force: true
    }).then(() => console.log(chalk.gray(`File ${fullPath} removed!`)))
  } catch (error) {
    console.log(chalk.gray('Error writing to remove file', error))
  }
}

export async function saveDataToFile (
  fileName: string,
  data: any,
  removeFileBefore = true,
  folderPath?: string
) {
  try {
    if (!folderPath) folderPath = DEFAULT_FOLDER
    const file = path.resolve(folderPath, `${fileName}.json`)

    if (removeFileBefore) {
      console.log(chalk.red('Removing existing files before...'))
      await removeFile(file)
    }

    return promisify(fs.writeFile)(file, JSON.stringify(data)).then(() => {
      console.log(chalk.green(`File ${file} created!`))
      console.log()
    })
  } catch (error) {
    console.log(chalk.red('Error writing to file', error))
    throw error
  }
}
