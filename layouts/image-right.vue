<template>
  <main class="slidev-layout layout-image-right layout-media">
    <div class="layout-media__content">
      <slot />
    </div>
    <div class="layout-media__image">
      <slot name="image" />
    </div>
    <span class="layout-page"><SlideCurrentNo /></span>
  </main>
</template>
