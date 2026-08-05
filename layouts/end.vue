<template>
  <main class="slidev-layout layout-end layout-shell">
    <div class="layout-end__content">
      <slot />
    </div>
    <footer class="layout-footer">
      <div class="layout-end__meta">
        <slot name="meta" />
      </div>
      <span class="layout-page"><SlideCurrentNo /></span>
    </footer>
  </main>
</template>
