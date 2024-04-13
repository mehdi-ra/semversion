export interface IVersionSchema {
  versionChangeType: TVersionChange
  environment: TEnvironments
  cleanVersion: string
  isPreRelease: boolean
  oldVersion: string
}

export type TEnvironments = 'prod' | 'dev' | 'stage' | 'unknown'
export type TVersionChange = 'major' | 'minor' | 'patch' | 'unknown'
