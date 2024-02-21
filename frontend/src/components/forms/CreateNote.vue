<script setup lang="ts">
import { FormKit } from '@formkit/vue'
import { useNotification } from '@kyvg/vue3-notification'
import { useNotesStore } from '@/stores/notesStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { onUpdated } from 'vue'
const { notify } = useNotification()
const notesStore = useNotesStore()
const { createNote } = useNotesStore()
const { error } = storeToRefs(notesStore)

const handleSubmit = async (formData: { title: string; content: string }) => {
  await createNote(formData)
  if (error.value) {
    notify({ text: error.value, type: 'error' })
  } else {
    notify({ text: 'note created', type: 'success' })
  }
  formData.title = ''
  formData.content = ''
}
onMounted(() => {
  notesStore.getAllNotes()
})
onUpdated(() => {
  console.log('created')
})
</script>

<template>
  <FormKit type="form" submit-label="create note" @submit="handleSubmit">
    <h2 class="text-sky-500 font-bold capitalize mt-4">create a note</h2>
    <FormKit
      type="text"
      name="title"
      placeholder="create a title"
      validation="required|length:3,100"
    />
    <FormKit
      type="textarea"
      name="content"
      placeholder="create a content"
      validation="required|length:3,500"
    />
  </FormKit>
</template>
