<script setup lang="ts">
import { watch } from 'vue'
import { useNotification } from '@kyvg/vue3-notification'
import { useNotesStore } from '@/stores/notesStore'
import type { TNote } from '@/types'
import UpdateIcon from '@/components/icons/UpdateIcon.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'

type Props = {
  note: TNote
}
const { notify } = useNotification()
const { deleteNote, getNotes } = useNotesStore()
const props = defineProps<Props>()
const handleDelete = (id: string) => {
  deleteNote(id)
  notify({ text: `Note with id ${id} deleted`, type: 'success' })
}
watch(getNotes, () => {
  console.log(`note deleted`)
})
</script>
<template>
  <div class="border border-gray-400 capitalize p-2 rounded flex justify-between">
    <div>
      <h2 class="text-sky-500 text-lg font-bold">{{ props.note.title }}</h2>
      <p class="text-gray-400 text-sm">{{ props.note.content }}</p>
      <h3>{{ props.note.user.name }}</h3>
    </div>
    <div class="flex gap-1">
      <router-link :to="{ name: 'updateNote', params: { id: props.note.id } }">
        <UpdateIcon />
      </router-link>
      <DeleteIcon @click="handleDelete(`${props.note.id}`)" />
    </div>
  </div>
</template>
