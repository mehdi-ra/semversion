"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectCommitVersionChange = detectCommitVersionChange;
const const_1 = require("../const");
function detectCommitVersionChange(commitMessage) {
    const isCandidateForMajorIncrease = const_1.isCandidateForMajorIncreaseRegEx.test(commitMessage);
    if (isCandidateForMajorIncrease) {
        return 'major';
    }
    const isCandidateForMinorIncrease = const_1.isCandidateForMinorIncreaseRegEx.test(commitMessage);
    if (isCandidateForMinorIncrease) {
        return 'minor';
    }
    const isCandidateForPatchIncrease = const_1.isCandidateForPatchIncreaseRegEx.test(commitMessage);
    if (isCandidateForPatchIncrease) {
        return 'patch';
    }
    return 'unknown';
}
//# sourceMappingURL=detectcommitversionchange.js.map