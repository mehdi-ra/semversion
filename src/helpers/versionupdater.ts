import { inc } from 'semver';
import { IVersionSchema } from '../interfaces/version';
import { versionMiddlewareApplier } from './versionmiddlewareapplier';

export const versionUpdater = (function (): {
  major: (versionUpdaterSchema: IVersionSchema) => string;
  minor: (versionUpdaterSchema: IVersionSchema) => string;
  patch: (versionUpdaterSchema: IVersionSchema) => string;
  unknown: (versionUpdaterSchema: IVersionSchema) => string;
} {
  return {
    major: (versionUpdaterSchema: IVersionSchema): string => {
      const env = versionUpdaterSchema.environment;
      const oldVersion = versionUpdaterSchema.oldVersion;

      if (versionUpdaterSchema.isPreRelease) {
        const newVersion = inc(oldVersion, 'premajor', env, false);

        if (!newVersion) {
          throw new Error('New version on premajor update is null');
        }

        return versionMiddlewareApplier(
          newVersion,
          versionUpdaterSchema.middlewares
        );
      }

      const newVersion = inc(oldVersion, 'major');

      if (!newVersion) {
        throw new Error('New version on major update is null');
      }

      return versionMiddlewareApplier(
        newVersion,
        versionUpdaterSchema.middlewares
      );
    },

    minor: (versionUpdaterSchema: IVersionSchema): string => {
      const env = versionUpdaterSchema.environment;
      const oldVersion = versionUpdaterSchema.oldVersion;

      if (versionUpdaterSchema.isPreRelease) {
        const newVersion = inc(oldVersion, 'preminor', env, false);

        if (!newVersion) {
          throw new Error('New version on preminor update is null');
        }

        return versionMiddlewareApplier(
          newVersion,
          versionUpdaterSchema.middlewares
        );
      }

      const newVersion = inc(oldVersion, 'minor');

      if (!newVersion) {
        throw new Error('New version on minor update is null');
      }

      return versionMiddlewareApplier(
        newVersion,
        versionUpdaterSchema.middlewares
      );
    },

    patch: (versionUpdaterSchema: IVersionSchema): string => {
      const env = versionUpdaterSchema.environment;
      const oldVersion = versionUpdaterSchema.oldVersion;

      if (versionUpdaterSchema.isPreRelease) {
        const newVersion = inc(oldVersion, 'prepatch', env, false);

        if (!newVersion) {
          throw new Error('New version on prepatch update is null');
        }

        return versionMiddlewareApplier(
          newVersion,
          versionUpdaterSchema.middlewares
        );
      }

      const newVersion = inc(oldVersion, 'patch');

      if (!newVersion) {
        throw new Error('New version on patch update is null');
      }

      return versionMiddlewareApplier(
        newVersion,
        versionUpdaterSchema.middlewares
      );
    },

    unknown: (versionUpdaterSchema: IVersionSchema): string => {
      if (versionUpdaterSchema.environment === 'prod') {
        return versionMiddlewareApplier(
          versionUpdaterSchema.coerceVersion,
          versionUpdaterSchema.middlewares
        );
      } else if (versionUpdaterSchema.environment !== 'unknown') {
        return versionMiddlewareApplier(
          `${versionUpdaterSchema.coerceVersion}-${versionUpdaterSchema.environment}`,
          versionUpdaterSchema.middlewares
        );
      } else {
        return versionMiddlewareApplier(
          versionUpdaterSchema.cleanVersion,
          versionUpdaterSchema.middlewares
        );
      }
    },
  };
})();
