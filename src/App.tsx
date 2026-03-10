import React, { useState } from 'react'
import FileTree from './FileTree'
import FileContent from './FileContent'

function getRepoFromUrl() {
  const params = new URLSearchParams(window.location.search)
  const repo = params.get('repo')

  if (!repo) return { owner: '', repo: '' }

  const [owner, repoName] = repo.split('/')
  return { owner, repo: repoName }
}

export default function App() {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])

  const { owner, repo } = getRepoFromUrl()

  if (!owner || !repo) {
    return (
      <div style={{ padding: 20 }}>
        <h1>GitHub Markdown連結ビューア　</h1>
        <p>URLに repo パラメータを指定してください</p>

        <pre>
          {`?repo=owner/repository

例
?repo=facebook/react`}
        </pre>
      </div>
    )
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>
        {owner}/{repo}
      </h1>

      <FileTree
        owner={owner}
        repo={repo}
        onSelect={(files) => setSelectedFiles(files.split(',').filter(Boolean))}
      />

      {selectedFiles.length > 0 && (
        <FileContent owner={owner} repo={repo} files={selectedFiles} />
      )}
    </div>
  )
}
