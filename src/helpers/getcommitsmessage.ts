import { Octokit } from '@octokit/rest';
import { input } from './getInput';
import { getRepoDetails } from './getreponame';

/**
 * Get the commit message using hash commit id.
 * @returns {Promise<string>} The commit message.
 */
export async function getCommitsMessage(): Promise<string> {
  const repoDetails = getRepoDetails();
  const commitSha = input('commit_sha');
  const token = input('token');

  const octokit = new Octokit({
    auth: token,
  });

  const targetCommit = await octokit.request(
    'GET /repos/{owner}/{repo}/commits/{ref}',
    {
      owner: repoDetails.owner,
      repo: repoDetails.name,
      ref: commitSha,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  );

  return targetCommit.data.commit.message || '';
}
