import { defineStore } from 'pinia'
import {
  createNoteAction,
  deleteNoteAction,
  getAllNotesAction,
  getNoteByIdAction,
  updateNoteAction
} from '@/api/actions/notes'
import type { TNote, createNoteDTO } from '@/types'
import { useAuthStore } from '@/stores/auth'
export const useNotesStore = defineStore('notes', {
  state: () => ({
    note: null as TNote | null,
    notes: [] as TNote[],
    error: '' as string
  }),
  getters: {
    getNotes: (state) => state.notes,
    getNote: (state) => state.note
  },
  actions: {
    getAllNotes() {
      const authStore = useAuthStore()
      getAllNotesAction(authStore.token as string)
        .then((res) => {
          this.notes = res.notes
          this.error = ''
        })
        .catch((err) => {
          if (err instanceof Error) this.error = err.message
        })
    },
    getNoteById(id: string) {
      const authStore = useAuthStore()
      getNoteByIdAction(id, authStore.token as string)
        .then((res) => {
          this.note = res.note
          this.error = ''
        })
        .catch((err) => {
          if (err instanceof Error) this.error = err.message
        })
    },
    async createNote(createNoteDto: createNoteDTO) {
      try {
        const authStore = useAuthStore()
        const res = await createNoteAction(createNoteDto, authStore.token as string)
        if (res.error) {
          this.error = res.error
        } else {
          this.error = ''
          this.getAllNotes()
        }
      } catch (err) {
        if (err instanceof Error) this.error = err.message
      }
    },
    updateNote(id: string, updateNoteDto: createNoteDTO) {
      const authStore = useAuthStore()
      updateNoteAction(id, updateNoteDto, authStore.token as string)
        .then((res) => {
          if (res.error) {
            this.error = res.error
          } else {
            this.error = ''
            this.note = res.note
            this.getAllNotes()
          }
        })
        .catch((err) => {
          if (err instanceof Error) this.error = err.message
        })
    },
    deleteNote(id: string) {
      const authStore = useAuthStore()
      deleteNoteAction(id, authStore.token as string)
        .then((res) => {
          if (res.error) {
            this.error = res.error
          } else {
            this.error = ''
            this.getAllNotes()
          }
        })
        .catch((err) => {
          if (err instanceof Error) {
            this.error = err.message
          }
        })
    }
  }
})
/*
export const useNotesStore = defineStore('notes', () => {
  const authStore = useAuthStore()
  const notes = ref<TNote[]>([])
  const error = ref<string>('')
  const computedNotes = computed(() => notes.value)
  // get all notes
  function getAllNotes() {
    getAllNotesAction(authStore.token as string)
      .then((res) => {
        console.log(res)
        notes.value = res.notes
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
        console.log(err)
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
  return { notes, computedNotes, getAllNotes, createNote, error, updateNote, deleteNote }
})
*/
