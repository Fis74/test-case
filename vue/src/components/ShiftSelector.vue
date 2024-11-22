<template>
  <ui-select
    id="shift"
    v-model="localValueModel"
    label="Смена:"
    :options="data"
    defaultLabel="Выберите смену"
    :disabled="isDisabled"
    @open="toggleOpen"
  />
</template>

<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { computed, ref, watch } from 'vue'

import UiSelect from './ui/UiSelect.vue'
import { Data, Result } from '../types/types.ts'

const props = defineProps<{
  modelValue: Data
  isDisabled: boolean
  depsId?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Data): void
}>()

const fetcher = async (): Promise<Result[]> =>
  await fetch('/shift.json').then((response) => response.json())

const toggleOpen = (value: boolean) => {
  open.value = value
}

const open = ref<boolean>(false)

const enabled = computed(() => open.value)

const { data } = useQuery({
  queryKey: ['shift-selector'],
  queryFn: () => fetcher(),
  enabled,
  staleTime: 10 * 1000,
})

const localValueModel = computed({
  get() {
    return props.modelValue
  },
  set(value: Data) {
    emit?.('update:modelValue', value)
  },
})

watch(
  () => props.depsId,
  () => {
    localValueModel.value.id = undefined
    localValueModel.value.name = undefined
  }
)
</script>
