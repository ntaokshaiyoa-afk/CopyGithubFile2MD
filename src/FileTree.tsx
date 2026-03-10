import React, { useEffect, useState } from 'react'
import { fetchRepoTree } from './github'

interface FileTreeProps {
  owner: string
  repo: string
  onSelect: (files: string) => void
}

interface Node {
  name: string
  path: string
  type: 'file' | 'dir'
  children?: Node[]
}

function buildTree(paths: string[]): Node[] {
  const root: Record<string, Node> = {}

  for (const path of paths) {
    const parts = path.split('/')
    let current = root
    let currentPath = ''

    parts.forEach((part, index) => {
      currentPath += (index ? '/' : '') + part

      if (!current[part]) {
        current[part] = {
          name: part,
          path: currentPath,
          type: index === parts.length - 1 ? 'file' : 'dir',
          children: {},
        } as any
      }

      if (index < parts.length - 1) {
        current = current[part].children as any
      }
    })
  }

  function convert(obj: Record<string, Node>): Node[] {
    return Object.values(obj).map((node: any) => ({
      ...node,
      children: node.children ? convert(node.children) : undefined,
    }))
  }

  return convert(root)
}

export default function FileTree({ owner, repo, onSelect }: FileTreeProps) {
  const [tree, setTree] = useState<Node[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [open, setOpen] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchRepoTree(owner, repo).then((items) => {
      const paths = items.map((i) => i.path)
      setTree(buildTree(paths))
    })
  }, [owner, repo])

  const toggleFile = (path: string) => {
    const newSet = new Set(selected)

    if (newSet.has(path)) newSet.delete(path)
    else newSet.add(path)

    setSelected(newSet)

    onSelect(Array.from(newSet).join(','))
  }

  const toggleDir = (path: string) => {
    const newOpen = new Set(open)

    if (newOpen.has(path)) newOpen.delete(path)
    else newOpen.add(path)

    setOpen(newOpen)
  }

  function renderNode(node: Node, depth = 0): any {
    if (node.type === 'file') {
      return (
        <div key={node.path} style={{ paddingLeft: depth * 16 }}>
          <input
            type="checkbox"
            checked={selected.has(node.path)}
            onChange={() => toggleFile(node.path)}
          />
          ✅ {node.name}
        </div>
      )
    }

    return (
      <div key={node.path}>
        <div
          style={{ paddingLeft: depth * 16, cursor: 'pointer' }}
          onClick={() => toggleDir(node.path)}
        >
          📁 {node.name}
        </div>

        {open.has(node.path) &&
          node.children?.map((child) => renderNode(child, depth + 1))}
      </div>
    )
  }

  return <div>{tree.map((node) => renderNode(node))}</div>
}
