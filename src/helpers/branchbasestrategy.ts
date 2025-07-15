import { isBranchCandidateForMajorIncreaseRegEx, isBranchCandidateForMinorIncreaseRegEx, isBranchCandidateForPatchIncreaseRegEx } from "../const";
import { TVersionChange } from "../interfaces/version";

/**
 * This will generate the next version change based on the what the commit
 * message is for merge requests only and based on target and source branch
 * @param commitMessage 
 */
export function detectBranchBaseVersionChange(target: string, source: string, releaseBranch: string = "develop"): TVersionChange {
    try {
        let result: TVersionChange = "unknown";

        if (typeof target !== "string" || typeof source !== "string") {
            throw new Error("Invalid Input types check your parameters")
        }

        const tests: {[key: string]: (source: string) => boolean} = {
            minor: (source: string) => 
                isBranchCandidateForMinorIncreaseRegEx.test(source),
            major: (source: string) => 
                isBranchCandidateForMajorIncreaseRegEx.test(source),
            patch: (source: string) => 
                isBranchCandidateForPatchIncreaseRegEx.test(source),
        }

        for(const changeType of Object.keys(tests)) {
            const actualTest = tests[changeType];
            
            if (actualTest(source) && target === releaseBranch) {
                result = changeType as TVersionChange;
            }
        }

        return result;
    }
    catch (e) {
        throw new Error(`(fn) detectBranchBaseVersionChange(): ${e}`)
    }
}