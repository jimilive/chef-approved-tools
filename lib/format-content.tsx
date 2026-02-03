import { ReactNode } from 'react'

/**
 * Converts **bold** markdown in string content to <strong> JSX elements.
 * Returns non-string ReactNode content unchanged.
 */
export function processBoldMarkdown(content: ReactNode): ReactNode {
  if (typeof content !== 'string') return content
  const parts = content.split(/\*\*(.*?)\*\*/g)
  if (parts.length === 1) return content
  return <>{parts.map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part)}</>
}
