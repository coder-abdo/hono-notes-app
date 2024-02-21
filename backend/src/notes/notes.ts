import { Hono } from "hono";
import { prisma } from "../prismaClient";
import { authenticate } from "../middlewares/authMiddleware";
import { validator } from "hono/validator";
import { noteShema } from "../schema/note/noteShema";

const app = new Hono();
// get all notes
app.get("/all", authenticate, async (c) => {
  const userId = c.get("userId" as never);
  const userNotes = await prisma.note.findMany({
    where: {
      userId: userId as number,
    },
    include: {
      user: true,
    },
  });
  return c.json({ notes: userNotes }, 200);
});
// create note
app.post(
  "/add",
  validator("json", (value, c) => {
    const parsedData = noteShema.safeParse(value);
    if (!parsedData.success) return c.json(parsedData.error, 400);
    return parsedData.data;
  }),
  authenticate,
  async (c) => {
    const { content, title } = c.req.valid("json");
    const userId = c.get("userId" as never);
    const user = await prisma.user.findFirst({
      where: {
        id: +userId,
      },
    });
    if (!user) return c.json({ error: "User not found" }, 404);
    const note = await prisma.note.create({
      data: {
        userId: +userId,
        title,
        content,
      },
    });
    if (!note) return c.json({ error: "Note not created" }, 400);
    return c.json({ message: "Note created!!" }, 200);
  },
);

// get note with id
app.get("/:id", authenticate, async (c) => {
  const noteId = c.req.param("id");
  const note = await prisma.note.findFirst({
    where: {
      id: +noteId,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          password: false,
        },
      },
    },
  });
  if (!note) return c.json({ error: `Note with id ${noteId} not found` }, 404);
  return c.json({ note }, 200);
});
// update note
app.put("/:id", authenticate, async (c) => {
  const noteId = c.req.param("id");
  const { title, content } = (await c.req.json()) as any;
  const existedNote = await prisma.note.findFirst({
    where: {
      id: +noteId,
    },
  });
  if (!existedNote)
    return c.json({ error: `Note with id ${noteId} not found` }, 404);
  const updatedNote = await prisma.note.update({
    where: {
      id: +noteId,
    },
    data: {
      title,
      content,
    },
  });
  return c.json({ note: updatedNote }, 200);
});
// delete note
app.delete("/:id", authenticate, async (c) => {
  const noteId = c.req.param("id");
  await prisma.note.delete({
    where: {
      id: +noteId,
    },
  });
  return c.json({ message: "Note deleted" }, 200);
});

export default app;
