import { getNextVersionSchema } from './helpers/getnextversionscheme'
import { generateNextVersion } from './helpers/generatenextversion'
import { getCommitsMessage } from './helpers/getcommitsmessage'
import { getLastRelease } from './helpers/getlastrelease'
import { output } from './helpers/setoutput'
import { setFailed } from '@actions/core'

/**
 * The main function for the action.
 * - First get latest release should be version like v1.0.1 or 1.0.1
 * - Get commit message: We should detect version increase type by commit, only
 *   the merge requests are detected.
 * - Clean up and generate the next version.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const lastReleaseVersion = await getLastRelease()
    const commitMessage = await getCommitsMessage()
    const nextVersionSchema = getNextVersionSchema(
      lastReleaseVersion,
      commitMessage
    )
    output('environment', nextVersionSchema.environment)
    output('nextVersion', generateNextVersion(nextVersionSchema))
    output('versionChangeType', nextVersionSchema.versionChangeType)
    output('oldVersion', nextVersionSchema.oldVersion)
    output('prerelease', nextVersionSchema.isPreRelease ? 'true' : 'false')
  } catch (error) {
    if (error instanceof Error) {
      setFailed(error.message)
    }
    console.log(error);
    setFailed(error?.toString() || "Undefined error happened")
  }
}
