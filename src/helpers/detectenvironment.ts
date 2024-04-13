import { TEnvironments } from 'src/interfaces/version'
import { input } from './getInput'

/**
 * Get the target environment
 * @returns {TEnvironments}
 */
export function detectEnvironment(): TEnvironments {
  const branch = input('branch_name')
  const stageBranch = input('stage_branch_name')
  const prodBranch = input('prod_branch_name')
  const devBranch = input('dev_branch_name')

  if (branch === prodBranch) {
    return 'prod'
  }

  if (branch === devBranch) {
    return 'dev'
  }

  if (branch === stageBranch) {
    return 'stage'
  }

  return 'unknown'
}
