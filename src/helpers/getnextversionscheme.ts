import { clean, coerce, valid } from 'semver'
import { detectEnvironment } from './detectenvironment'
import { IVersionSchema } from 'src/interfaces/version'
import { detectCommitVersionChange } from './detectcommitversionchange'
import { input } from './getInput'

/**
 * Get next version schema witch includes information about the
 * previous version and next version.
 */
export function getNextVersionSchema(
  lastRelease: string,
  commitMessage: string
): IVersionSchema {
  const environment = detectEnvironment()
  const cleanVersion = clean(lastRelease, { loose: true })
  const versionChangeType = detectCommitVersionChange(commitMessage)
  const isPreRelease = environment === 'prod' ? false : true
  const addDate = input('addDate') === 'true' ? true : false
  const middlewares: ((version: string) => string)[] = []
  const coerceVersion = valid(coerce(cleanVersion))
  const versionPrefix = input('versionPrefix')

  if (!cleanVersion) {
    throw new Error(
      `Clean version is not correct or null, cleanVersion: ${cleanVersion}, lastRelease: ${lastRelease}`
    )
  }

  if (!coerceVersion) {
    throw new Error(
      `Version is not valid or null coerce, lastRelease: ${lastRelease}, coerceVersion: ${coerceVersion}`
    )
  }

  if (!cleanVersion) {
    throw new Error(
      `Clean version is null, lastRelease: ${lastRelease}, cleanVersion: ${cleanVersion}`
    )
  }

  if (addDate) {
    middlewares.push((version: string): string => {
      const formattedDate = (): string =>
        new Date().toISOString().replace(/[T:-]/g, '-').split('.')[0]
      return `${version}-${formattedDate()}`
    })
  }

  middlewares.push((version: string): string => {
    return `${versionPrefix}${version}`
  })

  return {
    environment,
    cleanVersion,
    isPreRelease,
    middlewares,
    versionChangeType,
    coerceVersion,
    oldVersion: lastRelease
  }
}
