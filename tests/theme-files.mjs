import { readFile } from 'node:fs/promises'

export const root = new URL('../', import.meta.url)

// Normalize CRLF so the checks behave the same on Windows checkouts and in CI.
export function readThemeFile(path) {
  return readFile(new URL(path, root), 'utf8').then(text => text.replace(/\r\n/g, '\n'))
}
