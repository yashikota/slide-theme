<template>
  <main class="slidev-layout layout-image-left layout-media">
    <div class="layout-media__image">
      <slot name="image" />
    </div>
    <div class="layout-media__content">
      <slot />
    </div>
    <span class="layout-page"><SlideCurrentNo /></span>
  </main>
</template>
