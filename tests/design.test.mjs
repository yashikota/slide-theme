import assert from 'node:assert/strict'
import test from 'node:test'

import { readThemeFile } from './theme-files.mjs'

test('style entry is self-contained and never relies on UnoCSS @apply injection order', async () => {
  const entry = await readThemeFile('styles/index.ts')
  const css = await readThemeFile('styles/index.css')

  assert.match(entry, /\.\/index\.css/)
  assert.doesNotMatch(entry, /layouts-base\.css/)
  assert.doesNotMatch(css, /@apply/)
  assert.match(css, /\.slidev-layout\s*\{\s*height:\s*100%/)
  assert.match(css, /\.slidev-layout ul\s*\{\s*list-style:\s*square/)
  assert.match(css, /\.slidev-layout ol\s*\{\s*list-style:\s*decimal/)
})

test('theme bundles UDEV Gothic and exposes color tokens', async () => {
  const css = await readThemeFile('styles/index.css')

  assert.match(css, /font-family:\s*"UDEV Gothic";\s*src:\s*url\('\.\.\/assets\/fonts\/UDEVGothic-Regular\.ttf'\)/)
  assert.match(css, /font-family:\s*"UDEV Gothic";\s*src:\s*url\('\.\.\/assets\/fonts\/UDEVGothic-Bold\.ttf'\)/)
  for (const token of ['--kota-accent', '--kota-ink', '--kota-muted', '--kota-rule', '--kota-track', '--kota-cover-bg'])
    assert.match(css, new RegExp(`${token}:\\s*#[0-9a-f]{6}`))
  assert.match(css, /--slidev-theme-primary:\s*var\(--kota-accent\)/)
})

test('body scales with --kota-scale while the title stays fixed', async () => {
  const css = await readThemeFile('styles/index.css')

  assert.match(css, /\.slidev-layout\s*\{[^}]*--kota-scale:\s*1/)
  assert.match(css, /\.slidev-layout\s*\{[^}]*font-size:\s*calc\(30px \* var\(--kota-scale\)\)/)
  assert.match(css, /\.slidev-layout h2\s*\{[^}]*font-size:\s*38px/)
  assert.match(css, /\.slidev-layout h2\s*\{[^}]*border-bottom:\s*3px solid var\(--kota-accent\)/)
})

test('page number and progress bar appear on every slide except the cover', async () => {
  const css = await readThemeFile('styles/index.css')

  assert.match(css, /\.slidev-page::after\s*\{[^}]*content:\s*attr\(data-slidev-no\)/)
  assert.match(css, /\.slidev-page:has\(\.slidev-layout\.cover\)::after\s*\{\s*content:\s*none/)
  assert.match(css, /\.kota-progress\s*\{[^}]*bottom:\s*0/)
  assert.match(css, /\.kota-progress-bar\s*\{[^}]*background:\s*var\(--kota-accent\)/)
  assert.match(css, /\.slidev-page:has\(\.slidev-layout\.cover\) \.kota-progress\s*\{\s*display:\s*none/)
})

test('slide-bottom layer fits the body, segments Japanese and draws the progress bar', async () => {
  const layer = await readThemeFile('slide-bottom.vue')

  assert.match(layer, /useSlideContext\(\)/)
  assert.match(layer, /loadDefaultJapaneseParser/)
  assert.match(layer, /--kota-scale/)
  assert.match(layer, /class="kota-progress"/)
  assert.match(layer, /\$page\.value \/ \$nav\.value\.total/)
  assert.match(layer, /data-waitfor="\.kota-fit-ready"/)
})

test('vite config pre-bundles budoux so the browser build of its DOM helpers is used', async () => {
  const config = await readThemeFile('vite.config.ts')

  assert.match(config, /optimizeDeps/)
  assert.match(config, /'slidev-theme-kota > budoux'/)
  assert.match(config, /'budoux'/)
  assert.match(config, /cssMinify:\s*false/)
})

test('cover layout only wraps the slot in the cover class', async () => {
  const cover = await readThemeFile('layouts/cover.vue')

  assert.match(cover, /class="slidev-layout cover"/)
  assert.match(cover, /<slot \/>/)
})
