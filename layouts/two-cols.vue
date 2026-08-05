<template>
  <div class="slidev-layout layout-two-cols layout-shell">
    <header class="layout-header">
      <slot name="title" />
    </header>
    <main class="layout-two-cols__content">
      <section class="layout-two-cols__column">
        <slot />
      </section>
      <section class="layout-two-cols__column">
        <slot name="right" />
      </section>
    </main>
    <footer class="layout-footer">
      <slot name="footer" />
      <span class="layout-page"><SlideCurrentNo /></span>
    </footer>
  </div>
</template>
