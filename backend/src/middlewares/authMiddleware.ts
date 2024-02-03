import jwt, { JwtPayload } from "jsonwebtoken";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { Context, Next } from "hono";
import { prisma } from "../prismaClient";

export const authenticate = async (c: Context, next: Next) => {
  const accessToken = c.req.header("Authorization");
  const refreshToken = getCookie(c, "token");
  if (!accessToken && !refreshToken) {
    return c.json({ error: "Unauthorized" }, 403);
  }
  try {
    const decoded = (await jwt.verify(
      accessToken as string,
      process.env.JWT_SECRET as string,
    )) as JwtPayload;
    c.set("userId", decoded.id);
    const user = await prisma.user.findUnique({
      where: {
        id: +decoded.id,
      },
    });
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    await next();
  } catch (err) {
    if (!refreshToken && !accessToken) {
      return c.json({ error: "access denied" }, 401);
    }
    await next();
  }
};
