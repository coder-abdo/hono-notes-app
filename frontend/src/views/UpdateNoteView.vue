<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNotification } from '@kyvg/vue3-notification'
import { FormKit } from '@formkit/vue'
import { useNotesStore } from '@/stores/notesStore'
const { notify } = useNotification()
const notesStore = useNotesStore()
const { updateNote, getNoteById, getNotes } = useNotesStore()
const { error, note } = storeToRefs(notesStore)

const router = useRouter()
const route = useRoute()

onMounted(() => {
  getNoteById(`${route.params.id}`)
  notify({ text: 'note loaded', type: 'success' })
})
watch(getNotes, () => {
  console.log(`note with id ${route.params.id} is updated`)
})
const handleSubmit = (formData: { title: string; content: string }) => {
  updateNote(`${route.params.id}`, formData)
  if (error.value) {
    notify({ text: error.value, type: 'error' })
  } else {
    router.push('/')
  }
}
</script>

<template>
  <FormKit v-if="note" type="form" @submit="handleSubmit" submit-label="update note">
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
<style scoped>
form {
  @apply flex flex-col max-w-[500px] w-full mx-auto;
}
</style>
