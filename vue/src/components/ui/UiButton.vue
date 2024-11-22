<template>
  <button class="button" :disabled="props.isDisabled" @click="handleClick">
    <slot />
  </button>
</template>

<script lang="ts" setup>
const emits = defineEmits<{
  (e: 'click'): void
}>()

const props = defineProps<{
  isDisabled?: boolean
}>()

const handleClick = () => {
  emits('click')
}
</script>

<style></style>
