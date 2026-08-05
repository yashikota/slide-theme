import assert from 'node:assert/strict'
import test from 'node:test'

import { layoutNames, readThemeFile } from './theme-files.mjs'

test('theme provides the nine planned layouts', async () => {
  const layouts = await Promise.all(
    layoutNames.map(name => readThemeFile(`layouts/${name}.vue`)),
  )

  assert.equal(layouts.length, 9)
  for (const layout of layouts) {
    assert.match(layout, /<template>/)
    assert.match(layout, /class="slidev-layout\s+layout-/)
  }
})

test('content layouts expose clear semantic slots', async () => {
  const twoCols = await readThemeFile('layouts/two-cols.vue')
  const imageLeft = await readThemeFile('layouts/image-left.vue')
  const imageRight = await readThemeFile('layouts/image-right.vue')
  const quote = await readThemeFile('layouts/quote.vue')

  assert.match(twoCols, /name="right"/)
  assert.match(imageLeft, /name="image"/)
  assert.match(imageRight, /name="image"/)
  assert.match(quote, /name="attribution"/)
})

test('Callout limits emphasis to note and warning', async () => {
  const callout = await readThemeFile('components/Callout.vue')

  assert.match(callout, /'note'\s*\|\s*'warning'/)
  assert.match(callout, /type:\s*'note'/)
  assert.match(callout, /<aside/)
  assert.doesNotMatch(callout, /aria-label/)
})

test('Figure requires source and alternative text', async () => {
  const figure = await readThemeFile('components/Figure.vue')

  assert.match(figure, /src:\s*string/)
  assert.match(figure, /alt:\s*string/)
  assert.match(figure, /<figcaption/)
  assert.match(figure, /v-if="caption"/)
})

test('layout styles include every specialized composition', async () => {
  const css = await readThemeFile('styles/layouts.css')

  for (const name of layoutNames)
    assert.match(css, new RegExp(`\\.layout-${name}`))
  assert.match(css, /\.callout/)
  assert.match(css, /\.theme-figure/)
})

test('content-focused layouts repeat the current page number', async () => {
  const names = ['image-left', 'image-right', 'quote', 'statement']
  const layouts = await Promise.all(
    names.map(name => readThemeFile(`layouts/${name}.vue`)),
  )

  for (const layout of layouts)
    assert.match(layout, /<SlideCurrentNo \/>/)
})
