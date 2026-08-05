<script setup lang="ts">
import { computed } from 'vue'

type CalloutType = 'note' | 'warning'

const props = withDefaults(defineProps<{
  type?: CalloutType
  label?: string
}>(), {
  type: 'note',
})

const defaultLabels: Record<CalloutType, string> = {
  note: 'Note / 補足',
  warning: 'Caution / 注意',
}

const calloutLabel = computed(() => props.label || defaultLabels[props.type])
</script>

<template>
  <aside
    class="callout"
    :data-kind="props.type"
  >
    <div class="callout__label">
      {{ calloutLabel }}
    </div>
    <div class="callout__content">
      <slot />
    </div>
  </aside>
</template>
