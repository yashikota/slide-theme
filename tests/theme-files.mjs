import { readFile } from 'node:fs/promises'

export const root = new URL('../', import.meta.url)

export const layoutNames = [
  'cover',
  'default',
  'section',
  'statement',
  'two-cols',
  'image-left',
  'image-right',
  'quote',
  'end',
]

export function readThemeFile(path) {
  return readFile(new URL(path, root), 'utf8')
}
