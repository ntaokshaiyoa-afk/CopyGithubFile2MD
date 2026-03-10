import React, { useState } from 'react';
import FileTree from './FileTree';
import FileContent from './FileContent';

export default function App() {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const owner = 'ntaokshaiyoa-afk';
  const repo = 'CopyGithubFile2MD';

  return (
    <div>
      <h1>GitHub Markdown連結ビューア</h1>
      <FileTree
        owner={owner}
        repo={repo}
        onSelect={(files) => setSelectedFiles(files.split(',').filter(Boolean))}
      />
      {selectedFiles.length > 0 && (
        <FileContent owner={owner} repo={repo} files={selectedFiles} />
      )}
    </div>
  );
}
