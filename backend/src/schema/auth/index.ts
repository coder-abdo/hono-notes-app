import { z } from "zod";

const signUpSchema = z.object({
  body: z
    .object({
      name: z.string({
        required_error: "name is required",
        invalid_type_error: "name must be a string",
      }),
      email: z.string().email({
        message: "invalid email",
      }),
      password: z.string().min(6, "password must be at least 6 characters"),
      confirmPassword: z.string().min(6),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
      if (password !== confirmPassword) {
        ctx.addIssue({
          code: "custom",
          message: "passwords must match",
        });
      }
    }),
});
const signInSchema = z.object({
  email: z.string().email({ message: "invalid email" }),
  password: z.string().min(6, "password must be at least 6 characters"),
});
export { signUpSchema, signInSchema };
