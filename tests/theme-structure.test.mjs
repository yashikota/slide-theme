import assert from 'node:assert/strict'
import { access } from 'node:fs/promises'
import test from 'node:test'

import { readThemeFile, root } from './theme-files.mjs'

test('package metadata defines a local Slidev theme', async () => {
  const pkg = JSON.parse(await readThemeFile('package.json'))

  assert.equal(pkg.name, 'kota-slide-1')
  assert.equal(pkg.type, 'module')
  assert.deepEqual(pkg.keywords, ['slidev-theme', 'slidev'])
  assert.equal(pkg.engines.node, '>=20.12.0')
  assert.equal(pkg.slidev.colorSchema, 'light')
  assert.equal(pkg.slidev.defaults.aspectRatio, '16/9')
  assert.deepEqual(Object.keys(pkg.scripts).sort(), [
    'build',
    'dev',
    'export',
    'screenshot',
    'test',
  ])
})

test('theme entry points exist', async () => {
  const requiredPaths = [
    '.gitignore',
    '.github/workflows/pages.yml',
    'components',
    'layouts',
    'pnpm-workspace.yaml',
    'styles/index.ts',
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

test('only the required browser exporter may run an install script', async () => {
  const workspace = await readThemeFile('pnpm-workspace.yaml')

  assert.match(workspace, /allowBuilds:\s*\n\s+playwright-chromium:\s+true/)
})

test('git ignores generated exports without hiding theme assets', async () => {
  const gitignore = await readThemeFile('.gitignore')

  assert.match(gitignore, /^\/example-export\/$/m)
  assert.match(gitignore, /^\/example-export\.pdf$/m)
  assert.doesNotMatch(gitignore, /^\*\.png$/m)
  assert.doesNotMatch(gitignore, /^\*\.pdf$/m)
})
