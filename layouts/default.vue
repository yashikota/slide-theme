<template>
  <div class="slidev-layout layout-default layout-shell">
    <header class="layout-header">
      <div class="layout-label">
        <slot name="label" />
      </div>
    </header>
    <main class="layout-content">
      <slot />
    </main>
    <footer class="layout-footer">
      <slot name="footer" />
      <span class="layout-page"><SlideCurrentNo /></span>
    </footer>
  </div>
</template>
