<template>
  <label :for="id">{{ label }}</label>
  <select
    :id="id"
    v-model="selectedValue"
    :disabled="disabled"
    @click.prevent="toggle = !toggle"
  >
    <option :value="{ id: undefined, name: undefined }" disabled>
      {{ defaultLabel }}
    </option>
    <option
      v-for="option in options"
      :key="option.id"
      :value="{ id: option.id, name: option.name }"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

import { Data, Result } from '../../types/types.ts'

const emits = defineEmits<{
  (e: 'update:modelValue', value: Data): void
  (e: 'open', value: boolean): void
}>()

const props = defineProps<{
  id: string
  label: string
  options: Result[] | undefined
  defaultLabel: string
  modelValue: Data
  disabled?: boolean
}>()

const toggle = ref<boolean>(false)

const selectedValue = ref<Data>(props.modelValue)

watch(toggle, (newValue) => {
  emits('open', newValue)
})

watch(selectedValue, (newValue) => {
  emits('update:modelValue', newValue)
})

watch(
  () => props.modelValue,
  (newValue) => {
    selectedValue.value = newValue
  }
)
</script>
