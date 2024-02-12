import { z } from 'zod'
const signupSchema = z
  .object({
    name: z.string({ required_error: 'Name is required' }),
    email: z.string().email('email is required'),
    password: z.string().min(6, 'password must be atleast 6 characters long'),
    confirmPassword: z.string().min(6, 'password must be atleast 6 characters long')
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'passwords do not match'
      })
    }
  })

const loginSchema = z.object({
  email: z.string().email({ message: 'invalid email' }),
  password: z.string().min(6, { message: 'password must be at least 6 characters' })
})

export { loginSchema, signupSchema }
