<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useNotification } from '@kyvg/vue3-notification'
import { useNotesStore } from '@/stores/notesStore'
import NoteComponent from '../note/NoteComponent.vue'
const { notify } = useNotification()
const notesStore = useNotesStore()
const { getAllNotes } = useNotesStore()
const { error, notes } = storeToRefs(notesStore)
onMounted(async () => {
  await getAllNotes()
  notify({ type: 'success', text: 'Notes loaded' })
})
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <NoteComponent v-for="note in notes" :key="note.id" :note="note" />
  </div>
</template>
