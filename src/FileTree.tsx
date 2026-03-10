import React, { useState, useEffect } from 'react';
import { fetchRepoTree } from './github';

interface FileTreeProps {
  owner: string;
  repo: string;
  onSelect: (file: string) => void;
}

export default function FileTree({ owner, repo, onSelect }: FileTreeProps) {
  const [files, setFiles] = useState<string[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchRepoTree(owner, repo).then((tree) => {
      setFiles(tree.map((item: any) => item.path));
    });
  }, [owner, repo]);

  const toggleFile = (file: string) => {
    const newSet = new Set(selected);
    if (newSet.has(file)) newSet.delete(file);
    else newSet.add(file);
    setSelected(newSet);
    onSelect(Array.from(newSet).join(','));
  };

  return (
    <div>
      {files.map((file) => (
        <div key={file}>
          <input
            type="checkbox"
            checked={selected.has(file)}
            onChange={() => toggleFile(file)}
          />
          {file}
        </div>
      ))}
    </div>
  );
}
