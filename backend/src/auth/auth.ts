import { Hono } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { validator } from "hono/validator";
import jwt from "jsonwebtoken";
import { signInSchema, signUpSchema } from "../schema/auth";
import { prisma } from "../prismaClient";
import { authenticate } from "../middlewares/authMiddleware";
const app = new Hono();

app.post(
  "/signup",
  validator("json", (value, c) => {
    const parsedData = signUpSchema.safeParse({ body: value });
    if (!parsedData.success) {
      return c.json({ errors: parsedData }, 400);
    }
    return parsedData.data;
  }),
  async (c) => {
    const { body } = c.req.valid("json" as never) as
      | {
          email: string;
          password: string;
          name: string;
          confirmPassword: string;
        }
      | any;
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (existingUser) {
      return c.json({ error: "user already exists" }, 400);
    }
    const hashedPassword = await Bun.password.hash(body.password);
    await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: hashedPassword,
      },
    });
    return c.json({ message: "signup success" }, 201);
  },
);
// sign in
app.post(
  "/signin",
  validator("json", (value, c) => {
    const parsedData = signInSchema.safeParse(value);
    if (!parsedData.success) {
      return c.json({ errors: parsedData }, 400);
    }
    return parsedData.data;
  }),
  async (c) => {
    const { email, password } = c.req.valid("json" as never) as
      | {
          email: string;
          password: string;
        }
      | any;
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!existingUser) {
      return c.json({ error: "user is not exists" }, 400);
    }
    const isMatchPassword = await Bun.password.verify(
      password,
      existingUser.password,
    );
    if (!isMatchPassword) {
      return c.json({ error: "email or password is incorrect" }, 400);
    }
    const accessToken = jwt.sign(
      { id: existingUser.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );
    const refreshToken = jwt.sign(
      { id: existingUser.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" },
    );
    setCookie(c, "token", refreshToken, {
      httpOnly: true,
      sameSite: "Strict",
      secure: true,
    });
    c.header("Authorization", accessToken);
    return c.json(
      { message: "sign success", token: accessToken, user: existingUser },
      201,
    );
  },
);
// get accessToken from refresh token
app.post("/refresh", async (c) => {
  const refreshToken = getCookie(c, "token");
  if (!refreshToken) return c.json({ error: "access denied" }, 403);
  deleteCookie(c, "token");
  const decoded = jwt.verify(
    refreshToken,
    process.env.JWT_SECRET as string,
  ) as any;
  const accessToken = jwt.sign(
    { id: decoded.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" },
  );
  c.header("Authorization", accessToken);
  c.json({ message: "success token" }, 201);
});
app.get("/logout", authenticate, (c) => {
  deleteCookie(c, "token");
  return c.json({ message: "success logout" }, 200);
});
export default app;
