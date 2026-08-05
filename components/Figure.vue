<script setup lang="ts">
defineProps<{
  src: string
  alt: string
  caption?: string
}>()
</script>

<template>
  <figure class="theme-figure">
    <img
      class="theme-figure__image"
      :src="src"
      :alt="alt"
    >
    <figcaption
      v-if="caption"
      class="theme-figure__caption"
    >
      {{ caption }}
    </figcaption>
  </figure>
</template>
