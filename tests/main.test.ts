import { run } from '../src/main';

// Mock @actions/core
jest.mock('@actions/core', () => ({
  getInput: jest.fn(),
  setOutput: jest.fn(),
  setFailed: jest.fn(),
  info: jest.fn(),
  warning: jest.fn(),
  error: jest.fn(),
}));

// Mock @octokit/rest
jest.mock('@octokit/rest', () => ({
  Octokit: jest.fn().mockImplementation(() => ({
    request: jest.fn().mockResolvedValue({
      data: [
        {
          tag_name: 'v1.0.0',
          created_at: '2023-01-01T00:00:00Z'
        }
      ]
    })
  })),
}));

describe('Main Action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should run without errors', async () => {
    // Mock the required inputs
    const core = require('@actions/core');
    core.getInput.mockImplementation((name: string) => {
      const inputs: Record<string, string> = {
        repo_name: 'test/repo',
        token: 'test-token',
        branch_name: 'main',
        commit_sha: 'abc123',
      };
      return inputs[name] || '';
    });

    await expect(run()).resolves.not.toThrow();
  });

  it('should handle errors gracefully', async () => {
    const core = require('@actions/core');
    core.getInput.mockImplementation(() => {
      throw new Error('Test error');
    });

    await run();

    expect(core.setFailed).toHaveBeenCalledWith('Test error');
  });
});
