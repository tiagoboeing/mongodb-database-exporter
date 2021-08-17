export interface ExecuteConfigs {
  folderPath?: string
  removeFileBefore: boolean
  mongoConnection: {
    hostname: string
    username: string
    password: string
    database: string
  }
}

export interface ModuleDeclaration {
  execute: (configs?: ExecuteConfigs) => Promise<void>
}
