import { IRepoDetails } from '../interfaces/repodetails';
import { input } from './getInput';

export function getRepoDetails(): IRepoDetails {
  const fullname = input('repo_name').split('/');
  if (fullname.length < 2 || !fullname[0] || !fullname[1]) {
    throw new Error('Invalid repository name format. Expected "owner/repo"');
  }
  return {
    owner: fullname[0],
    name: fullname[1],
  };
}
