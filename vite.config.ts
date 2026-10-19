import { fileURLToPath } from 'node:url'

// budoux's ESM entry reaches node-only DOM code (linkedom, cssom) unless Vite pre-bundles it with
// the browser field applied. Vite never scans node_modules for dependencies, so when this theme is
// installed as a package the id has to be nested under the package name.
const installed = fileURLToPath(import.meta.url).includes('node_modules')

export default {
  // Slidev 53's generated code styles fail Lightning CSS minification in Vite 8.
  build: { cssMinify: false },
  optimizeDeps: { include: [installed ? 'slidev-theme-kota > budoux' : 'budoux'] },
}
