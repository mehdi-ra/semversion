"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextVersionSchema = getNextVersionSchema;
const semver_1 = require("semver");
const detectenvironment_1 = require("./detectenvironment");
const detectcommitversionchange_1 = require("./detectcommitversionchange");
const getInput_1 = require("./getInput");
function getNextVersionSchema(lastRelease, commitMessage) {
    const environment = (0, detectenvironment_1.detectEnvironment)();
    const cleanVersion = (0, semver_1.clean)(lastRelease, { loose: true });
    const versionChangeType = (0, detectcommitversionchange_1.detectCommitVersionChange)(commitMessage);
    const isPreRelease = environment === 'prod' ? false : true;
    const addDate = (0, getInput_1.input)('addDate') === 'true' ? true : false;
    const middlewares = [];
    const coerceVersion = (0, semver_1.valid)((0, semver_1.coerce)(cleanVersion));
    const versionPrefix = (0, getInput_1.input)('versionPrefix');
    if (!cleanVersion) {
        throw new Error(`Clean version is not correct or null, cleanVersion: ${cleanVersion}, lastRelease: ${lastRelease}`);
    }
    if (!coerceVersion) {
        throw new Error(`Version is not valid or null coerce, lastRelease: ${lastRelease}, coerceVersion: ${coerceVersion}`);
    }
    if (!cleanVersion) {
        throw new Error(`Clean version is null, lastRelease: ${lastRelease}, cleanVersion: ${cleanVersion}`);
    }
    if (addDate) {
        middlewares.push((version) => {
            const formattedDate = () => {
                const dateStr = new Date()
                    .toISOString()
                    .replace(/[T:-]/g, '-')
                    .split('.')[0];
                if (!dateStr) {
                    throw new Error('Failed to format date');
                }
                return dateStr;
            };
            return `${version}-${formattedDate()}`;
        });
    }
    middlewares.push((version) => {
        return `${versionPrefix}${version}`;
    });
    return {
        environment,
        cleanVersion,
        isPreRelease,
        middlewares,
        versionChangeType,
        coerceVersion,
        oldVersion: lastRelease,
    };
}
//# sourceMappingURL=getnextversionscheme.js.map