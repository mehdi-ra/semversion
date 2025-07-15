"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRepoDetails = getRepoDetails;
const getInput_1 = require("./getInput");
function getRepoDetails() {
    const fullname = (0, getInput_1.input)('repo_name').split('/');
    if (fullname.length < 2 || !fullname[0] || !fullname[1]) {
        throw new Error('Invalid repository name format. Expected "owner/repo"');
    }
    return {
        owner: fullname[0],
        name: fullname[1],
    };
}
//# sourceMappingURL=getreponame.js.map