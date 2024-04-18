# Smart versioning action


# Magic Semver

![Magic Semver Icon](https://example.com/icon.png)

**Description:** This project will generate your next version depending on the commit message and
your branch rules.

**Author:** Mehdi Rahimi ([@mehdi-ra](https://github.com/mehdi-ra))

## Inputs

| Name                     | Description                                              | Default              |
|--------------------------|----------------------------------------------------------|----------------------|
| `repo_name`              | Target repository name.                                  | `${{ github.repository }}` |
| `dev_branch_name`        | Development branch name.                                 | `develop`            |
| `stage_branch_name`      | Stage branch name.                                       | `stage`              |
| `prod_branch_name`       | Production branch name.                                  | `main`               |
| `breaking_change_expression` | Breaking change expression which will increase the major version. | `BREAKING_CHANGE*` |
| `branch_name`            | The message of the commit.                               | `${{ github.ref_name }}` |
| `commit_sha`             | Commit message.                                          | `${{ github.sha }}` |
| `kind`                   | The kind of trigger. Pull, push, or other.               | `${{ github.event_name }}` |
| `token`                  | GitHub token.                                            | `${{ github.token }}` |

## Outputs

| Name                    | Description                      |
|-------------------------|----------------------------------|
| `environment`           | Target environment.              |
| `nextVersion`           | Generated next version.          |
| `versionChangeType`     | Major or other version change type. |
| `oldVersion`            | Previous version.                |

## Usage

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v2
    - name: Magic Semver Action
      id: semver
      uses: mehdi-ra/magic-semver-action@v0.5.0-2024-04-18-16-05-21

    - name: Get the outputs
      run: |
        echo "Environment: ${{ steps.semver.outputs.environment }}"
        echo "Next Version: ${{ steps.semver.outputs.nextVersion }}"
        echo "Version Change Type: ${{ steps.semver.outputs.versionChangeType }}"
        echo "Old Version: ${{ steps.semver.outputs.oldVersion }}"
