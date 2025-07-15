import {
  isCandidateForMajorIncreaseRegEx,
  isCandidateForMinorIncreaseRegEx,
  isCandidateForPatchIncreaseRegEx,
} from '../const';
import { TVersionChange } from '../interfaces/version';

export function detectCommitVersionChange(
  commitMessage: string
): TVersionChange {
  const isCandidateForMajorIncrease =
    isCandidateForMajorIncreaseRegEx.test(commitMessage);

  if (isCandidateForMajorIncrease) {
    return 'major';
  }

  const isCandidateForMinorIncrease =
    isCandidateForMinorIncreaseRegEx.test(commitMessage);

  if (isCandidateForMinorIncrease) {
    return 'minor';
  }

  const isCandidateForPatchIncrease =
    isCandidateForPatchIncreaseRegEx.test(commitMessage);

  if (isCandidateForPatchIncrease) {
    return 'patch';
  }

  return 'unknown';
}
