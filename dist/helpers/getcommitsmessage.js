"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommitsMessage = getCommitsMessage;
const rest_1 = require("@octokit/rest");
const getInput_1 = require("./getInput");
const getreponame_1 = require("./getreponame");
async function getCommitsMessage() {
    const repoDetails = (0, getreponame_1.getRepoDetails)();
    const commitSha = (0, getInput_1.input)('commit_sha');
    const token = (0, getInput_1.input)('token');
    const octokit = new rest_1.Octokit({
        auth: token,
    });
    const targetCommit = await octokit.request('GET /repos/{owner}/{repo}/commits/{ref}', {
        owner: repoDetails.owner,
        repo: repoDetails.name,
        ref: commitSha,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
        },
    });
    return targetCommit.data.commit.message || '';
}
//# sourceMappingURL=getcommitsmessage.js.map