<template>
  <ui-select
    id="city"
    v-model="localValueModel"
    label="Город:"
    :options="data"
    defaultLabel="Выберите город"
    @open="toggleOpen"
  />
</template>

<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { computed, ref } from 'vue'

import UiSelect from './ui/UiSelect.vue'
import { Data, Result } from '../types/types.ts'

const props = defineProps<{
  modelValue: Data
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Data): void
}>()

const toggleOpen = (value: boolean) => {
  open.value = value
}

const open = ref<boolean>(false)

const enabled = computed(() => open.value)

const { data } = useQuery({
  queryKey: ['city-selector'],
  queryFn: () => fetcher(),
  enabled,
  staleTime: 10 * 1000,
})

const fetcher = async (): Promise<Result[]> =>
  await fetch('/city.json').then((response) => response.json())

const localValueModel = computed({
  get() {
    return props.modelValue
  },
  set(value: Data) {
    emit?.('update:modelValue', value)
  },
})
</script>
