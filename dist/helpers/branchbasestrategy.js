"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectBranchBaseVersionChange = detectBranchBaseVersionChange;
const const_1 = require("../const");
function detectBranchBaseVersionChange(target, source, releaseBranch = 'develop') {
    try {
        let result = 'unknown';
        if (typeof target !== 'string' || typeof source !== 'string') {
            throw new Error('Invalid Input types check your parameters');
        }
        const tests = {
            minor: (source) => const_1.isBranchCandidateForMinorIncreaseRegEx.test(source),
            major: (source) => const_1.isBranchCandidateForMajorIncreaseRegEx.test(source),
            patch: (source) => const_1.isBranchCandidateForPatchIncreaseRegEx.test(source),
        };
        for (const changeType of Object.keys(tests)) {
            const actualTest = tests[changeType];
            if (actualTest(source) && target === releaseBranch) {
                result = changeType;
            }
        }
        return result;
    }
    catch (e) {
        throw new Error(`(fn) detectBranchBaseVersionChange(): ${e}`);
    }
}
//# sourceMappingURL=branchbasestrategy.js.map