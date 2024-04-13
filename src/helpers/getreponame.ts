import { IRepoDetails } from 'src/interfaces/repodetails'
import { input } from './getInput'

export function getRepoDetails(): IRepoDetails {
  const fullname = input('repo_name').split('/')
  return {
    owner: fullname[0],
    name: fullname[1]
  }
}
