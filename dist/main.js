"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const getnextversionscheme_1 = require("./helpers/getnextversionscheme");
const generatenextversion_1 = require("./helpers/generatenextversion");
const getcommitsmessage_1 = require("./helpers/getcommitsmessage");
const getLastRelease_1 = require("./helpers/getLastRelease");
const setoutput_1 = require("./helpers/setoutput");
const core_1 = require("@actions/core");
async function run() {
    try {
        const lastReleaseVersion = await (0, getLastRelease_1.getLastRelease)();
        const commitMessage = await (0, getcommitsmessage_1.getCommitsMessage)();
        const nextVersionSchema = (0, getnextversionscheme_1.getNextVersionSchema)(lastReleaseVersion, commitMessage);
        (0, setoutput_1.output)('environment', nextVersionSchema.environment);
        (0, setoutput_1.output)('nextVersion', (0, generatenextversion_1.generateNextVersion)(nextVersionSchema));
        (0, setoutput_1.output)('versionChangeType', nextVersionSchema.versionChangeType);
        (0, setoutput_1.output)('oldVersion', nextVersionSchema.oldVersion);
        (0, setoutput_1.output)('prerelease', nextVersionSchema.isPreRelease ? 'true' : 'false');
    }
    catch (error) {
        if (error instanceof Error)
            (0, core_1.setFailed)(error.message);
    }
}
//# sourceMappingURL=main.js.map