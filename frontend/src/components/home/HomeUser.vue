<script setup lang="ts">
import { onMounted, onUpdated } from 'vue'
import { storeToRefs } from 'pinia'
import { useNotification } from '@kyvg/vue3-notification'
import { useNotesStore } from '@/stores/notesStore'
import type { TUser } from '@/types'
import NotesComponent from '@/components/notes/NotesComponent.vue'
import CreateNote from '@/components/forms/CreateNote.vue'
interface Props {
  user: TUser | null
}
const { notify } = useNotification()
const notesStore = useNotesStore()
const { getAllNotes } = useNotesStore()
const { error, notes } = storeToRefs(notesStore)
onMounted(() => {
  getAllNotes()
  notify({ type: 'success', text: 'Notes loaded' })
})
onUpdated(() => {
  console.log('updated notes')
})

const props = defineProps<Props>()
</script>
<template>
  <h1 class="mb-4 font-bold text-2xl text-sky-500 capitalize">
    welcome back, {{ props.user?.name || 'guest' }}
  </h1>
  <NotesComponent v-if="notes.length > 0" :notes="notes" :error="error" />
  <p v-else>no notes yet, create now your first note</p>
  <CreateNote />
</template>
