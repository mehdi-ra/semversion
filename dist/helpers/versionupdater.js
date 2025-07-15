"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.versionUpdater = void 0;
const semver_1 = require("semver");
const versionmiddlewareapplier_1 = require("./versionmiddlewareapplier");
exports.versionUpdater = (function () {
    return {
        major: (versionUpdaterSchema) => {
            const env = versionUpdaterSchema.environment;
            const oldVersion = versionUpdaterSchema.oldVersion;
            if (versionUpdaterSchema.isPreRelease) {
                const newVersion = (0, semver_1.inc)(oldVersion, 'premajor', env, false);
                if (!newVersion) {
                    throw new Error('New version on premajor update is null');
                }
                return (0, versionmiddlewareapplier_1.versionMiddlewareApplier)(newVersion, versionUpdaterSchema.middlewares);
            }
            const newVersion = (0, semver_1.inc)(oldVersion, 'major');
            if (!newVersion) {
                throw new Error('New version on major update is null');
            }
            return (0, versionmiddlewareapplier_1.versionMiddlewareApplier)(newVersion, versionUpdaterSchema.middlewares);
        },
        minor: (versionUpdaterSchema) => {
            const env = versionUpdaterSchema.environment;
            const oldVersion = versionUpdaterSchema.oldVersion;
            if (versionUpdaterSchema.isPreRelease) {
                const newVersion = (0, semver_1.inc)(oldVersion, 'preminor', env, false);
                if (!newVersion) {
                    throw new Error('New version on preminor update is null');
                }
                return (0, versionmiddlewareapplier_1.versionMiddlewareApplier)(newVersion, versionUpdaterSchema.middlewares);
            }
            const newVersion = (0, semver_1.inc)(oldVersion, 'minor');
            if (!newVersion) {
                throw new Error('New version on minor update is null');
            }
            return (0, versionmiddlewareapplier_1.versionMiddlewareApplier)(newVersion, versionUpdaterSchema.middlewares);
        },
        patch: (versionUpdaterSchema) => {
            const env = versionUpdaterSchema.environment;
            const oldVersion = versionUpdaterSchema.oldVersion;
            if (versionUpdaterSchema.isPreRelease) {
                const newVersion = (0, semver_1.inc)(oldVersion, 'prepatch', env, false);
                if (!newVersion) {
                    throw new Error('New version on prepatch update is null');
                }
                return (0, versionmiddlewareapplier_1.versionMiddlewareApplier)(newVersion, versionUpdaterSchema.middlewares);
            }
            const newVersion = (0, semver_1.inc)(oldVersion, 'patch');
            if (!newVersion) {
                throw new Error('New version on patch update is null');
            }
            return (0, versionmiddlewareapplier_1.versionMiddlewareApplier)(newVersion, versionUpdaterSchema.middlewares);
        },
        unknown: (versionUpdaterSchema) => {
            if (versionUpdaterSchema.environment === 'prod') {
                return (0, versionmiddlewareapplier_1.versionMiddlewareApplier)(versionUpdaterSchema.coerceVersion, versionUpdaterSchema.middlewares);
            }
            else if (versionUpdaterSchema.environment !== 'unknown') {
                return (0, versionmiddlewareapplier_1.versionMiddlewareApplier)(`${versionUpdaterSchema.coerceVersion}-${versionUpdaterSchema.environment}`, versionUpdaterSchema.middlewares);
            }
            else {
                return (0, versionmiddlewareapplier_1.versionMiddlewareApplier)(versionUpdaterSchema.cleanVersion, versionUpdaterSchema.middlewares);
            }
        },
    };
})();
//# sourceMappingURL=versionupdater.js.map