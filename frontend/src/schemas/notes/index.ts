import { z } from 'zod'

const createNoteSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1)
})

export { createNoteSchema }
