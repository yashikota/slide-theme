<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { loadDefaultJapaneseParser } from 'budoux'
import { useSlideContext } from '@slidev/client'

// Progress toward the last slide, drawn as a bar along the bottom edge (see styles/index.css).
const { $page, $nav } = useSlideContext()
const progress = computed(() => $nav.value.total ? Math.min(1, $page.value / $nav.value.total) : 0)

const marker = ref()
const ready = ref(false)
const parser = loadDefaultJapaneseParser()
const processed = new WeakMap()
let observer, resizeObserver, frame, stopped = false
const watched = new WeakSet()

onMounted(async () => {
  const page = marker.value.closest('.slidev-page')
  // Slidev loads the page component asynchronously after the wrapper mounts.
  let layout
  while (!stopped && page?.isConnected && !(layout = page.querySelector('.slidev-layout'))) {
    await new Promise(resolve => requestAnimationFrame(resolve))
  }
  if (!layout || stopped) return

  function fit() {
    observer.disconnect()
    // Markdown can replace its layout during hot reload.
    layout = page.querySelector('.slidev-layout')
    if (!layout || !layout.getBoundingClientRect().width) {
      observer.observe(page, { childList: true, subtree: true, characterData: true })
      if (!watched.has(page)) { resizeObserver.observe(page); watched.add(page) }
      return
    }
    // Keep KaTeX, code and diagrams intact; only segment ordinary prose.
    const walker = document.createTreeWalker(layout, NodeFilter.SHOW_TEXT)
    const nodes = []
    while (walker.nextNode()) nodes.push(walker.currentNode)
    for (const node of nodes) {
      if (node.parentElement.closest('.katex, pre, code, svg, script, style')) continue
      if (!/[\u3040-\u30ff\u3400-\u9fff]/.test(node.textContent)) continue
      if (processed.get(node) === node.textContent) continue
      node.textContent = parser.parse(node.textContent.replaceAll('\u200b', '')).join('\u200b')
      processed.set(node, node.textContent)
      node.parentElement.classList.add('kota-prose')
    }
    // The title stays fixed across page transitions. Fit only the body below it.
    const title = layout.querySelector('h2')
    const fits = (scale) => {
      layout.style.setProperty('--kota-scale', String(scale))
      const bounds = layout.getBoundingClientRect()
      if (!bounds.width || !bounds.height) return true
      const styles = getComputedStyle(layout)
      const ratio = bounds.width / layout.offsetWidth
      const right = bounds.right - parseFloat(styles.paddingRight) * ratio
      const bottom = bounds.bottom - parseFloat(styles.paddingBottom) * ratio
      const left = bounds.left + parseFloat(styles.paddingLeft) * ratio
      const top = title ? title.getBoundingClientRect().bottom : bounds.top + parseFloat(styles.paddingTop) * ratio
      const rects = []
      const textWalker = document.createTreeWalker(layout, NodeFilter.SHOW_TEXT)
      while (textWalker.nextNode()) {
        const node = textWalker.currentNode
        if (title?.contains(node)) continue
        if (!node.textContent.trim() || node.parentElement.closest('.katex-mathml, script, style')) continue
        const range = document.createRange()
        range.selectNodeContents(node)
        rects.push(...range.getClientRects())
      }
      return [...rects, ...layout.querySelectorAll('img, video, svg, table, pre, .katex-display')].every(item => {
        const rect = item.getBoundingClientRect ? item.getBoundingClientRect() : item
        return !rect.width || (rect.left >= left - 1 && rect.top >= top - 1 && rect.right <= right + 1 && rect.bottom <= bottom + 1)
      })
    }
    let scale = 1
    if (!fits(1)) {
      let low = 0.1, high = 1
      for (let i = 0; i < 12; i++) {
        const mid = (low + high) / 2
        if (fits(mid)) low = mid
        else high = mid
      }
      scale = low
      fits(scale)
    }
    layout.dataset.fitScale = scale.toFixed(3)
    ready.value = true
    for (const element of [page, layout, ...layout.children]) {
      if (watched.has(element)) continue
      resizeObserver.observe(element)
      watched.add(element)
    }
    observer.observe(page, { childList: true, subtree: true, characterData: true })
  }
  const schedule = () => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => { if (!stopped) fit() })
  }
  observer = new MutationObserver(schedule)
  resizeObserver = new ResizeObserver(schedule)
  await document.fonts.ready
  if (stopped) return
  fit()
  layout.addEventListener('load', schedule, true)
  window.addEventListener('resize', schedule)
  document.fonts.addEventListener('loadingdone', schedule)
  cleanup = () => {
    layout.removeEventListener('load', schedule, true)
    window.removeEventListener('resize', schedule)
    document.fonts.removeEventListener('loadingdone', schedule)
  }
})
let cleanup = () => {}
onBeforeUnmount(() => { stopped = true; observer?.disconnect(); resizeObserver?.disconnect(); cancelAnimationFrame(frame); cleanup() })
</script>

<template>
  <div class="kota-progress" aria-hidden="true"><div class="kota-progress-bar" :style="{ width: `${progress * 100}%` }" /></div>
  <span ref="marker" data-waitfor=".kota-fit-ready" aria-hidden="true" style="position:absolute; right:0; bottom:0; width:1px; height:1px; overflow:hidden; opacity:0; pointer-events:none">
    <span v-if="ready" class="kota-fit-ready" style="display:block; width:1px; height:1px" />
  </span>
</template>
