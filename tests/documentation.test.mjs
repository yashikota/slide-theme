import assert from 'node:assert/strict'
import test from 'node:test'

import { layoutNames, readThemeFile } from './theme-files.mjs'

test('example deck exercises every layout and component', async () => {
  const example = await readThemeFile('example.md')

  assert.match(example, /^---\n[\s\S]*?layout:\s*cover\n[\s\S]*?---\n\n#/)
  assert.doesNotMatch(example, /^---[\s\S]*?---\n\n---\nlayout:\s*cover/)
  assert.match(
    example,
    /layout:\s*default\n---\n\n# [^\n]+[\s\S]*?::label::/,
  )
  assert.match(
    example,
    /layout:\s*image-left\n---\n\n# [^\n]+[\s\S]*?::image::/,
  )
  for (const layout of layoutNames)
    assert.match(example, new RegExp(`layout:\\s*${layout}`))
  assert.match(example, /<Callout/)
  assert.match(example, /<Figure/)
  assert.match(example, /```ts/)
  assert.match(example, /\|.+\|/)
  assert.match(example, /日本語/)
  assert.match(example, /English/)
})

test('README explains installation, layout choice, density, and theming', async () => {
  const readme = await readThemeFile('README.md')

  assert.match(readme, /pnpm/)
  assert.match(readme, /theme:\s*kota-slide-1/)
  assert.match(readme, /cover/)
  assert.match(readme, /two-cols/)
  assert.match(readme, /40/)
  assert.match(readme, /--color-accent/)
  assert.match(readme, /日本語/)
  assert.match(readme, /English/)
})
