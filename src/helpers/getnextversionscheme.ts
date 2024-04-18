import { clean } from 'semver'
import { detectEnvironment } from './detectenvironment'
import { IVersionSchema } from 'src/interfaces/version'
import { detectCommitVersionChange } from './detectcommitversionchange'
import { input } from './getInput'

/**
 * Get next version schema witch includes information about the
 * previous version and next version.
 */
export function getNextVersionSchema(
  latestVersion: string,
  commitMessage: string
): IVersionSchema {
  const environment = detectEnvironment()
  const cleanVersion = clean(latestVersion, { loose: true })
  const versionChangeType = detectCommitVersionChange(commitMessage)
  const isPreRelease = environment === 'prod' ? false : true
  const addDate = input('addDate') === 'true' ? true : false
  const middlewares: ((version: string) => string)[] = []

  if (!cleanVersion) {
    throw new Error(`Clean version is null, latest: ${latestVersion}`)
  }

  if (addDate) {
    middlewares.push((version: string): string => {
      const formattedDate = (): string =>
        new Date().toISOString().replace(/[T:-]/g, '-').split('.')[0]
      return `${version}-${formattedDate()}`
    })
  }

  return {
    environment,
    cleanVersion,
    isPreRelease,
    middlewares,
    versionChangeType,
    oldVersion: latestVersion
  }
}
