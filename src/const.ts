export const isCandidateForMajorIncreaseRegEx =
  new RegExp(/^(BREAKING_CHANGE){1}(\([\w.]+\))?(!)?: ([\w ])+([\s\S]*)/gm);

export const isCandidateForMinorIncreaseRegEx =
  new RegExp(/^(feat){1}(\([\w.]+\))?(!)?: ([\w ])+([\s\S]*)/gm);

export const isCandidateForPatchIncreaseRegEx =
  new RegExp(/^(fix){1}(\([\w.]+\))?(!)?: ([\w ])+([\s\S]*)/gm);

export const isBranchCandidateForMinorIncreaseRegEx = 
  new RegExp(/^feat\/.*$/);

export const isBranchCandidateForPatchIncreaseRegEx = 
  new RegExp(/^fix\/.*$/);

export const isBranchCandidateForMajorIncreaseRegEx = 
  new RegExp(/^(feat|fix)!\/.*$/);