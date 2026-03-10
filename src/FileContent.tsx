import React, { useEffect, useState } from 'react';
import { fetchFileContent } from './github';

interface FileContentProps {
  files: string[];
  owner: string;
  repo: string;
}

export default function FileContent({ files, owner, repo }: FileContentProps) {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    async function loadContent() {
      const results = await Promise.all(
        files.map(async (file) => {
          const text = await fetchFileContent(owner, repo, file)
          return `\`\`\`${file}\n${text}\n\`\`\``
        })
      )
  
      setContent(results.join('\n'))
    }
  
    if (files.length) loadContent()
  }, [files, owner, repo])

  const copyToClipboard = () => navigator.clipboard.writeText(content);

  return (
    <div>
      <button onClick={copyToClipboard}>コピー</button>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{content}</pre>
    </div>
  );
}
