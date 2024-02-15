<script setup lang="ts">
import { defineProps } from 'vue'
import type { TNote } from '@/types'
import UpdateIcon from '@/components/icons/UpdateIcon.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'
type Props = {
  note: TNote
}
const props = defineProps<Props>()
</script>
<template>
  <div class="border border-gray-400 capitalize p-2 rounded flex justify-between">
    <div>
      <h2 class="text-sky-500 text-lg font-bold">{{ props.note.title }}</h2>
      <p class="text-gray-400 text-sm">{{ props.note.content }}</p>
    </div>
    <div class="flex gap-1">
      <UpdateIcon />
      <DeleteIcon />
    </div>
  </div>
</template>
