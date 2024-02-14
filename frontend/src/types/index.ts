type TUser = {
  id: number
  name: string
  email: string
}

type TNote = {
  id: number
  title: string
  content: string
}
type loginDTO = {
  email: string
  password: string
}
type signupDTO = {
  name: string
  email: string
  password: string
  confirmPassword: string
}
type createNoteDTO = {
  title: string
  content: string
}
export type { TUser, TNote, loginDTO, signupDTO, createNoteDTO }
