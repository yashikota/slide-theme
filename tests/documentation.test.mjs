import assert from 'node:assert/strict'
import test from 'node:test'

import { readThemeFile } from './theme-files.mjs'

test('example deck exercises cover, table, math, references and auto fit', async () => {
  const example = await readThemeFile('example.md')

  assert.match(example, /^---\n[\s\S]*?theme:\s*\.\/\n[\s\S]*?---\n\n## /)
  assert.match(example, /\|.+\|/)
  assert.match(example, /\$\$/)
  assert.match(example, /### 参考文献/)
  assert.match(example, /equation-legend/)
  assert.match(example, /以上になります。ありがとうございました。/)
  for (const slide of example.split(/^---$/m).slice(2))
    assert.match(slide, /<!--[\s\S]*?-->/, 'every slide carries a speaker note')
})

test('README explains installation, frontmatter, customization and the font license', async () => {
  const readme = await readThemeFile('README.md')

  assert.match(readme, /pnpm add -D github:yashikota\/slide-theme/)
  assert.match(readme, /theme:\s*kota/)
  assert.match(readme, /--kota-accent/)
  assert.match(readme, /style\.css/)
  assert.match(readme, /BudouX/)
  assert.match(readme, /assets\/fonts\/LICENSE/)
})
