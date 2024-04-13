import { IVersionSchema } from 'src/interfaces/version'
import { versionUpdater } from './versionupdater'

/**
 * Get next version depending on older information.
 * @param {IVersionSchema} versionSchema
 * @returns {string} The next version.
 */
export function generateNextVersion(versionSchema: IVersionSchema): string {
  const nextVersionGen = versionUpdater[versionSchema.versionChangeType]
  return nextVersionGen(versionSchema)
}
