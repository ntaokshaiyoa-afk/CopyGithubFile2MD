interface GitHubTreeItem {
  path: string
  mode: string
  type: 'blob' | 'tree'
  sha: string
  size?: number
  url: string
}

interface GitHubTreeResponse {
  tree: GitHubTreeItem[]
}

export async function fetchRepoTree(
  owner: string,
  repo: string,
  branch: string = 'main',
): Promise<GitHubTreeItem[]> {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
  )

  const data: GitHubTreeResponse = await res.json()

  return data.tree.filter((item) => item.type === 'blob')
}

export async function fetchFileContent(
  owner: string,
  repo: string,
  path: string,
  branch: string = 'main',
): Promise<string> {
  const res = await fetch(
    `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`,
  )

  return res.text()
}
