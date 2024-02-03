import { z } from "zod";

export const noteShema = z.object({
  title: z.string().min(1, "title should not be empty"),
  content: z.string().min(1, "content should not be empty"),
});
