import { clean, valid } from 'semver'
import { detectEnvironment } from './detectenvironment'
import { IVersionSchema } from 'src/interfaces/version'
import { detectCommitVersionChange } from './detectcommitversionchange'

/**
 * Get next version schema witch includes information about the
 * previous version and next version.
 */
export function getNextVersionSchema(
  latestVersion: string,
  commitMessage: string
): IVersionSchema {
  const environment = detectEnvironment()
  const cleanVersion = valid(clean(latestVersion)) || 'null'
  const versionChangeType = detectCommitVersionChange(commitMessage)
  const isPreRelease = environment === 'prod' ? false : true

  return {
    environment,
    cleanVersion,
    isPreRelease,
    versionChangeType,
    oldVersion: latestVersion
  }
}
