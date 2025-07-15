"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastRelease = getLastRelease;
const rest_1 = require("@octokit/rest");
const getInput_1 = require("./getInput");
const getreponame_1 = require("./getreponame");
const core_1 = require("@actions/core");
async function getLastRelease() {
    const token = (0, getInput_1.input)('token');
    const repoDetails = (0, getreponame_1.getRepoDetails)();
    const octokit = new rest_1.Octokit({
        auth: token,
    });
    try {
        const releases = await octokit.request('GET /repos/{owner}/{repo}/releases', {
            owner: repoDetails.owner,
            repo: repoDetails.name,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            },
        });
        const sorted = releases.data.sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return dateB.getTime() - dateA.getTime();
        });
        const version = sorted[0]?.name || sorted[0]?.tag_name;
        if (!version) {
            throw new TypeError('Version is empty !');
        }
        return version;
    }
    catch (e) {
        (0, core_1.error)(e);
        return '0.1.0';
    }
}
//# sourceMappingURL=getlastrelease.js.map