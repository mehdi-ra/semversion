import { inc } from 'semver'
import { IVersionSchema } from 'src/interfaces/version'

export const versionUpdater = (function () {
  return {
    major: (versionUpdaterSchema: IVersionSchema): string => {
      const env = versionUpdaterSchema.environment
      const oldVersion = versionUpdaterSchema.oldVersion

      if (versionUpdaterSchema.isPreRelease) {
        return inc(oldVersion, 'premajor', env, false) || ''
      }

      return inc(oldVersion, 'major') || ''
    },

    minor: (versionUpdaterSchema: IVersionSchema): string => {
      const env = versionUpdaterSchema.environment
      const oldVersion = versionUpdaterSchema.oldVersion

      if (versionUpdaterSchema.isPreRelease) {
        return inc(oldVersion, 'preminor', env, false) || ''
      }

      return inc(oldVersion, 'minor') || ''
    },

    patch: (versionUpdaterSchema: IVersionSchema): string => {
      const env = versionUpdaterSchema.environment
      const oldVersion = versionUpdaterSchema.oldVersion

      if (versionUpdaterSchema.isPreRelease) {
        return inc(oldVersion, 'prepatch', env, false) || ''
      }

      return inc(oldVersion, 'patch') || ''
    },

    unknown: (versionUpdaterSchema: IVersionSchema): string => {
      return versionUpdaterSchema.oldVersion
    }
  }
})()
