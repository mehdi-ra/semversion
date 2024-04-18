export interface IVersionSchema {
  versionChangeType: TVersionChange
  environment: TEnvironments
  cleanVersion: string
  isPreRelease: boolean
  oldVersion: string
  coerceVersion: string
  middlewares: ((version: string) => string)[]
}

export type TEnvironments = 'prod' | 'dev' | 'stage' | 'unknown'
export type TVersionChange = 'major' | 'minor' | 'patch' | 'unknown'
