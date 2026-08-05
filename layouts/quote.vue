<template>
  <figure class="slidev-layout layout-quote">
    <blockquote class="layout-quote__body">
      <slot />
    </blockquote>
    <figcaption class="layout-quote__attribution">
      <slot name="attribution" />
    </figcaption>
    <span class="layout-page"><SlideCurrentNo /></span>
  </figure>
</template>
