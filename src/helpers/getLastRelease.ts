import { Octokit } from '@octokit/rest';
import { input } from './getInput';
import { getRepoDetails } from './getreponame';
import { error } from '@actions/core';

/**
 * Get latest release and the tag.
 * It should be version like :)
 * @returns { string } latest release name.
 */
export async function getLastRelease(): Promise<string> {
  const token = input('token');
  const repoDetails = getRepoDetails();
  const octokit = new Octokit({
    auth: token,
  });

  try {
    const releases = await octokit.request(
      'GET /repos/{owner}/{repo}/releases',
      {
        owner: repoDetails.owner,
        repo: repoDetails.name,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    );

    const sorted = releases.data.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB.getTime() - dateA.getTime();
    });

    const version = sorted[0]?.name || sorted[0]?.tag_name;

    if (!version) {
      throw new TypeError('Version is empty !');
    }

    return version;
  } catch (e) {
    error(e as Error);
    return '0.1.0';
  }
}
