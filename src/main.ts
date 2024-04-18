import { getNextVersionSchema } from './helpers/getnextversionscheme'
import { generateNextVersion } from './helpers/generatenextversion'
import { getCommitsMessage } from './helpers/getcommitsmessage'
import { getLatestRelease } from './helpers/getlatestrelease'
import { output } from './helpers/setoutput'
import { setFailed } from '@actions/core'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const latestVersion = await getLatestRelease()
    const commitMessage = await getCommitsMessage()
    const nextVersionSchema = getNextVersionSchema(latestVersion, commitMessage)

    output('environment', nextVersionSchema.environment)
    output('nextVersion', generateNextVersion(nextVersionSchema))
    output('versionChangeType', nextVersionSchema.versionChangeType)
    output('oldVersion', nextVersionSchema.oldVersion)
    output('prerelease', nextVersionSchema.isPreRelease ? 'true' : 'false')
  } catch (error) {
    if (error instanceof Error) setFailed(error.message)
  }
}
