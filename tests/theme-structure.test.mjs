import assert from 'node:assert/strict'
import { access } from 'node:fs/promises'
import test from 'node:test'

import { readThemeFile, root } from './theme-files.mjs'

test('package metadata defines the kota Slidev theme', async () => {
  const pkg = JSON.parse(await readThemeFile('package.json'))

  assert.equal(pkg.name, 'slidev-theme-kota')
  assert.equal(pkg.type, 'module')
  assert.deepEqual(pkg.keywords, ['slidev-theme', 'slidev'])
  assert.match(pkg.engines.slidev, /^>=53/)
  assert.deepEqual(Object.keys(pkg.scripts).sort(), ['build', 'dev', 'export', 'screenshot', 'test'])
  assert.ok(pkg.dependencies.budoux)
})

test('theme defaults remove per-deck boilerplate', async () => {
  const { defaults } = JSON.parse(await readThemeFile('package.json')).slidev

  assert.equal(defaults.colorSchema, 'light')
  assert.equal(defaults.aspectRatio, '16/9')
  assert.equal(defaults.canvasWidth, 1280)
  assert.equal(defaults.fonts.provider, 'none')
  assert.equal(defaults.fonts.sans, 'UDEV Gothic')
})

test('theme entry points and bundled fonts exist', async () => {
  const requiredPaths = [
    '.gitignore',
    '.github/workflows/pages.yml',
    'layouts/cover.vue',
    'slide-bottom.vue',
    'styles/index.ts',
    'styles/index.css',
    'vite.config.ts',
    'assets/fonts/UDEVGothic-Regular.ttf',
    'assets/fonts/UDEVGothic-Bold.ttf',
    'assets/fonts/LICENSE',
    'pnpm-workspace.yaml',
  ]

  await Promise.all(requiredPaths.map(path => access(new URL(path, root))))
})

test('GitHub Pages workflow tests and builds the example with a repository base path', async () => {
  const workflow = await readThemeFile('.github/workflows/pages.yml')

  assert.match(workflow, /branches:\s*\n\s+- main/)
  assert.match(workflow, /pnpm test/)
  assert.match(workflow, /slidev build example\.md --base/)
  assert.match(workflow, /github\.event\.repository\.name/)
  assert.match(workflow, /actions\/deploy-pages@v4/)
})
