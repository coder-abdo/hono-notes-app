import {
  createNoteAction,
  deleteNoteAction,
  getAllNotesAction,
  updateNoteAction
} from '@/api/actions/notes'
import type { TNote, createNoteDTO } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

export const useNotesStore = defineStore('notes', () => {
  const authStore = useAuthStore()
  const notes = ref<TNote[]>([])
  const error = ref<string>('')
  // get all notes
  function getAllNotes() {
    getAllNotesAction(authStore.token as string)
      .then((res) => {
        notes.value = res.data
        error.value = ''
      })
      .catch((err) => {
        if (err instanceof Error) error.value = err.message
      })
  }
  function createNote(createNoteDto: createNoteDTO) {
    createNoteAction(createNoteDto, authStore.token as string)
      .then((res) => {
        if (res.error) {
          error.value = res.error
        } else {
          error.value = ''
        }
      })
      .catch((err) => {
        if (err instanceof Error) error.value = err.message
      })
  }
  // update note
  function updateNote(id: string, updateNoteDto: createNoteDTO) {
    updateNoteAction(id, updateNoteDto, authStore.token as string)
      .then((res) => {
        if (res.error) {
          error.value = res.error
        } else {
          error.value = ''
        }
      })
      .catch((err) => {
        if (err instanceof Error) error.value = err.message
      })
  }
  // delete note
  function deleteNote(id: string) {
    deleteNoteAction(id, authStore.token as string)
      .then((res) => {
        if (res.error) {
          error.value = res.error
        } else {
          error.value = ''
        }
      })
      .catch((err) => {
        if (err instanceof Error) error.value = err.message
      })
  }
  return { notes, getAllNotes, createNote, error, updateNote, deleteNote }
})
