<template>
  <main class="slidev-layout layout-statement">
    <div class="layout-statement__content">
      <slot />
    </div>
    <div class="layout-statement__source">
      <slot name="source" />
    </div>
    <span class="layout-page"><SlideCurrentNo /></span>
  </main>
</template>
