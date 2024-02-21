<script setup lang="ts">
import type { TNote } from '@/types'
import NoteComponent from '../note/NoteComponent.vue'
type Props = {
  notes: TNote[]
  error: string
}
const props = defineProps<Props>()
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <span v-if="props.error">{{ props.error }}</span>
    <NoteComponent v-for="note in props.notes" :key="note.id" :note="note" />
  </div>
</template>
