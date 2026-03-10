export async function fetchRepoTree(owner: string, repo: string, branch: string = 'main') {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`);
  const data = await res.json();
  return data.tree.filter((item: any) => item.type === 'blob'); // ファイルのみ
}

export async function fetchFileContent(owner: string, repo: string, path: string) {
  const res = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`);
  return await res.text();
}
