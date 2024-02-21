<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, onUpdated } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNotification } from '@kyvg/vue3-notification'
import { FormKit } from '@formkit/vue'
import { useNotesStore } from '@/stores/notesStore'
const { notify } = useNotification()
const notesStore = useNotesStore()
const { updateNote, getNoteById, getAllNotes } = useNotesStore()
const { error, note } = storeToRefs(notesStore)

const router = useRouter()
const route = useRoute()

onMounted(() => {
  getNoteById(`${route.params.id}`)
  notify({ text: 'note loaded', type: 'success' })
})
const handleSubmit = (formData: { title: string; content: string }) => {
  updateNote(`${route.params.id}`, formData)
  if (error.value) {
    notify({ text: error.value, type: 'error' })
  } else {
    getAllNotes()
    router.push('/')
  }
}
onMounted(() => {
  getAllNotes()
})
onUpdated(() => {
  console.log('updated')
})
</script>

<template>
  <FormKit
    v-if="note"
    type="form"
    class="flex flex-col max-w-[500px] w-full mx-auto"
    @submit="handleSubmit"
  >
    <h1 class="text-lg capitalize text-center mb-3 text-sky-500">update a note</h1>
    <FormKit type="text" v-model="note.title" name="title" label="title" validations="required" />
    <FormKit
      type="textarea"
      v-model="note.content"
      name="content"
      label="content"
      validations="required"
    />
  </FormKit>
</template>
