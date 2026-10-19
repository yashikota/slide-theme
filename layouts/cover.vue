<script setup>
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

// The date comes from the headmatter (`date: 2026/10/19`). YAML may parse ISO dates into Date objects.
const { $frontmatter } = useSlideContext()
const date = computed(() => {
  const value = $frontmatter?.date
  if (!value) return ''
  if (value instanceof Date) {
    const pad = n => String(n).padStart(2, '0')
    return `${value.getUTCFullYear()}/${pad(value.getUTCMonth() + 1)}/${pad(value.getUTCDate())}`
  }
  return String(value)
})
</script>

<template>
  <div class="slidev-layout cover">
    <slot />
    <p v-if="date" class="kota-cover-date">{{ date }}</p>
  </div>
</template>
