"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBranchCandidateForMajorIncreaseRegEx = exports.isBranchCandidateForPatchIncreaseRegEx = exports.isBranchCandidateForMinorIncreaseRegEx = exports.isCandidateForPatchIncreaseRegEx = exports.isCandidateForMinorIncreaseRegEx = exports.isCandidateForMajorIncreaseRegEx = void 0;
exports.isCandidateForMajorIncreaseRegEx = new RegExp(/^(BREAKING_CHANGE){1}(\([\w.]+\))?(!)?: ([\w ])+([\s\S]*)/gm);
exports.isCandidateForMinorIncreaseRegEx = new RegExp(/^(feat){1}(\([\w.]+\))?(!)?: ([\w ])+([\s\S]*)/gm);
exports.isCandidateForPatchIncreaseRegEx = new RegExp(/^(fix){1}(\([\w.]+\))?(!)?: ([\w ])+([\s\S]*)/gm);
exports.isBranchCandidateForMinorIncreaseRegEx = new RegExp(/^feat\/.*$/);
exports.isBranchCandidateForPatchIncreaseRegEx = new RegExp(/^fix\/.*$/);
exports.isBranchCandidateForMajorIncreaseRegEx = new RegExp(/^(feat|fix)!\/.*$/);
//# sourceMappingURL=const.js.map