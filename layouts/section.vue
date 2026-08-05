<template>
  <main class="slidev-layout layout-section">
    <div class="layout-section__number">
      <slot name="section" />
    </div>
    <div class="layout-section__content">
      <slot />
    </div>
    <span class="layout-page"><SlideCurrentNo /></span>
  </main>
</template>
