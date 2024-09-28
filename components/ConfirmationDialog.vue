<template>
  <div>
    <UModal v-model="isOpen" @close="closeDialog(false)">
      <UCard>
        <template #header>
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ header }}
          </h3>
        </template>
        <template #default>
          {{ text }}
        </template>
        <template #footer>
          <div class="flex justify-end space-x-3">
            <UButton label="Cancel" color="gray" variant="solid" @click="closeDialog(false)"/>
            <UButton label="Delete" @click="closeDialog"/>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
<script setup lang="ts">
import {closeDialog} from 'vue3-promise-dialog'

interface Props {
  header?: string
  text?: string
}

const props = defineProps<Props>()
const isOpen = ref(true)
defineExpose({
  returnValue: () => {
    return true
  },
});
</script>