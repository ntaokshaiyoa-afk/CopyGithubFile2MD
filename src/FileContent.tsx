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
      let md = '';
      for (const file of files) {
        const text = await fetchFileContent(owner, repo, file);
        md += `\`\`\`${file}\n${text}\n\`\`\`\n`;
      }
      setContent(md);
    }
    if (files.length) loadContent();
  }, [files, owner, repo]);

  const copyToClipboard = () => navigator.clipboard.writeText(content);

  return (
    <div>
      <button onClick={copyToClipboard}>コピー</button>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{content}</pre>
    </div>
  );
}
