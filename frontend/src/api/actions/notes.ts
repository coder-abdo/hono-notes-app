import { BASE_URL } from '@/constants'
import type { createNoteDTO } from '@/types'

// get all notes
const getAllNotesAction = async (token: string) => {
  try {
    const res = await fetch(`${BASE_URL}/notes/all`, {
      headers: {
        'content-type': 'application/json',
        Authorization: token
      }
    })
    const data = await res.json()
    return data
  } catch (err) {
    return err
  }
}
// get note by id
const getNoteByIdAction = async (id: string, token: string) => {
  try {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
      headers: {
        'content-type': 'application/json',
        Authorization: token
      }
    })
    const data = await res.json()
    return data
  } catch (err) {
    return err
  }
}
// create note
const createNoteAction = async (data: createNoteDTO, token: string) => {
  try {
    const res = await fetch(`${BASE_URL}/notes/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(data)
    })

    const result = await res.json()
    return result
  } catch (err) {
    return err
  }
}
// update note
const updateNoteAction = async (id: string, data: createNoteDTO, token: string) => {
  console.log(BASE_URL)
  try {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(data)
    })
    const result = await res.json()
    return result
  } catch (err) {
    return err
  }
}
// delete note
const deleteNoteAction = async (id: string, token: string) => {
  try {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: token
      }
    })
    const result = await res.json()
    return result
  } catch (err) {
    return err
  }
}
export {
  getAllNotesAction,
  getNoteByIdAction,
  createNoteAction,
  updateNoteAction,
  deleteNoteAction
}
