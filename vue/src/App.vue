<template>
  <div class="form">
    <city-selector v-model="city" />
    <workshop-selector
      v-model="workshop"
      :isDisabled="!city.id"
      :depsId="city.id"
    />
    <employee-selector
      v-model="employee"
      :isDisabled="!workshop.id"
      :depsId="workshop.id"
    />
    <brigade-selector
      v-model="brigade"
      :isDisabled="!employee.id"
      :depsId="employee.id"
    />
    <shift-selector
      v-model="shift"
      :isDisabled="!brigade.id"
      :depsId="brigade.id"
    />
    <ui-button :isDisabled="isDisabled" @click="saveToCookie">
      Сохранить
    </ui-button>
    <div v-if="message" class="message">
      {{ message }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

import BrigadeSelector from './components/BrigadeSelector.vue'
import CitySelector from './components/CitySelector.vue'
import EmployeeSelector from './components/EmployeeSelector.vue'
import ShiftSelector from './components/ShiftSelector.vue'
import UiButton from './components/ui/UiButton.vue'
import WorkshopSelector from './components/WorkshopSelector.vue'
import { Data } from './types/types.ts'

const city = ref<Data>({ id: undefined, name: undefined })
const workshop = ref<Data>({ id: undefined, name: undefined })
const employee = ref<Data>({ id: undefined, name: undefined })
const brigade = ref<Data>({ id: undefined, name: undefined })
const shift = ref<Data>({ id: undefined, name: undefined })
const message = ref<string | null>(null)

const isDisabled = computed(
  () =>
    !(
      city.value.id &&
      workshop.value.name &&
      employee.value.id &&
      brigade.value.id &&
      shift.value.id
    )
)

const resetForm = () => {
  city.value = { id: undefined, name: undefined }
  workshop.value = { id: undefined, name: undefined }
  employee.value = { id: undefined, name: undefined }
  brigade.value = { id: undefined, name: undefined }
  shift.value = { id: undefined, name: undefined }
}

const saveToCookie = () => {
  const data = {
    city: city.value.name,
    workshop: workshop.value.name,
    employee: employee.value.name,
    brigade: brigade.value.name,
    shift: shift.value.name,
  }
  document.cookie = `saveData=${JSON.stringify(data)}; expires=${new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString()}; path=/`
  message.value = 'Данные сохранены'
  resetForm()
  setTimeout(() => {
    message.value = null
  }, 2000)
}
</script>
