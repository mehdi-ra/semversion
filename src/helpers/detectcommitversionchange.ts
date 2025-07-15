import { TVersionChange } from '../interfaces/version';

export function detectCommitVersionChange(
  commitMessage: string
): TVersionChange {
  const isCandidateForMajorIncrease =
    /^(BREAKING_CHANGE){1}(\([\w.]+\))?(!)?: ([\w ])+([\s\S]*)/gm.test(
      commitMessage
    );

  if (isCandidateForMajorIncrease) {
    return 'major';
  }

  const isCandidateForMinorIncrease =
    /^(feat){1}(\([\w.]+\))?(!)?: ([\w ])+([\s\S]*)/gm.test(commitMessage);

  if (isCandidateForMinorIncrease) {
    return 'minor';
  }

  const isCandidateForPatchIncrease =
    /^(fix){1}(\([\w.]+\))?(!)?: ([\w ])+([\s\S]*)/gm.test(commitMessage);

  if (isCandidateForPatchIncrease) {
    return 'patch';
  }

  return 'unknown';
}
