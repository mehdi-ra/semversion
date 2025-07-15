"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectEnvironment = detectEnvironment;
const getInput_1 = require("./getInput");
function detectEnvironment() {
    const branch = (0, getInput_1.input)('branch_name');
    const stageBranch = (0, getInput_1.input)('stage_branch_name');
    const prodBranch = (0, getInput_1.input)('prod_branch_name');
    const devBranch = (0, getInput_1.input)('dev_branch_name');
    if (branch === prodBranch) {
        return 'prod';
    }
    if (branch === devBranch) {
        return 'dev';
    }
    if (branch === stageBranch) {
        return 'stage';
    }
    return 'unknown';
}
//# sourceMappingURL=detectenvironment.js.map