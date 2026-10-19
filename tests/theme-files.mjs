import { readFile } from 'node:fs/promises'

export const root = new URL('../', import.meta.url)

export function readThemeFile(path) {
  return readFile(new URL(path, root), 'utf8')
}
