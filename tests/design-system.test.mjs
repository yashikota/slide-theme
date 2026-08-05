import assert from 'node:assert/strict'
import test from 'node:test'

import { readThemeFile } from './theme-files.mjs'

test('style entry point loads fonts and focused style modules', async () => {
  const cssEntry = await readThemeFile('styles/index.ts')

  assert.doesNotMatch(cssEntry, /layouts-base\.css/)
  assert.match(cssEntry, /noto-sans-jp\/index\.css/)
  assert.match(cssEntry, /ibm-plex-mono\/400\.css/)
  assert.match(cssEntry, /\.\/tokens\.css/)
  assert.match(cssEntry, /\.\/base\.css/)
  assert.match(cssEntry, /\.\/layouts\.css/)
})

test('tokens define one accent and an eight-pixel spacing system', async () => {
  const tokens = await readThemeFile('styles/tokens.css')

  assert.match(tokens, /--color-paper:\s*#f7f8fa/)
  assert.match(tokens, /--color-ink:\s*#18212b/)
  assert.match(tokens, /--color-muted:\s*#52606d/)
  assert.match(tokens, /--color-rule:\s*#c8d1dc/)
  assert.match(tokens, /--color-accent:\s*#0959b0/)
  assert.match(tokens, /--space-1:\s*0\.5rem/)
  assert.match(tokens, /--space-8:\s*4rem/)
  assert.match(tokens, /--slide-padding-block:\s*var\(--space-6\)/)
  assert.match(tokens, /--measure-body:\s*42ch/)
  assert.match(tokens, /--text-h1:\s*28px/)
  assert.match(tokens, /--text-body:\s*24px/)
  assert.match(tokens, /--text-caption:\s*18px/)
})

test('base typography supports Japanese and English content', async () => {
  const base = await readThemeFile('styles/base.css')

  assert.match(base, /font-family:\s*var\(--font-sans\)/)
  assert.match(base, /line-break:\s*strict/)
  assert.match(base, /overflow-wrap:\s*normal/)
  assert.match(base, /word-break:\s*normal/)
  assert.match(base, /hyphens:\s*none/)
  assert.match(base, /text-wrap:\s*balance/)
  assert.match(base, /font-variant-numeric:\s*tabular-nums/)
  assert.match(base, /padding:\s*0\.35rem var\(--space-2\)/)
  assert.match(base, /:focus-visible/)
})

test('layout foundation uses a twelve-column grid and structural rail', async () => {
  const layouts = await readThemeFile('styles/layouts.css')

  assert.match(layouts, /\.slidev-layout\[class\*="layout-"\]/)
  assert.match(layouts, /repeat\(12,\s*minmax\(0,\s*1fr\)\)/)
  assert.match(layouts, /block-size:\s*100%/)
  assert.match(layouts, /box-sizing:\s*border-box/)
  assert.match(layouts, /\.layout-content\s*\{[\s\S]*padding-block:\s*var\(--space-3\)/)
  assert.match(layouts, /\.layout-default \.layout-footer\s*\{[\s\S]*inset-block-end:\s*var\(--space-6\)/)
  assert.match(layouts, /\.callout\s*\{[\s\S]*margin-block:\s*var\(--space-2\)/)
  assert.match(layouts, /\.callout\s*\{[\s\S]*padding-block:\s*var\(--space-1\)/)
  assert.match(layouts, /\.slidev-layout\.layout-statement\s*\{[\s\S]*grid-template-rows:\s*auto auto/)
  assert.match(layouts, /\.slidev-layout \.layout-quote__body\s*\{[\s\S]*border-inline-start:\s*0/)
  assert.match(layouts, /\.layout-media > \.layout-page,[\s\S]*color:\s*var\(--color-muted\)/)
  assert.match(layouts, /\.slidev-layout::before/)
  assert.match(layouts, /inline-size:\s*0\.5rem/)
  assert.doesNotMatch(layouts, /subgrid/)
  assert.doesNotMatch(layouts, /box-shadow|linear-gradient|border-radius/)
})
