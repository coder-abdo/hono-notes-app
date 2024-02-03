import { Hono } from "hono";
import { poweredBy } from "hono/powered-by";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import authRoute from "./auth/auth";
import notesRoute from "./notes/notes";

const app = new Hono();
app.use("*", poweredBy());
app.use("*", logger());
app.use("*", cors());

app.route("/auth", authRoute);

app.route("/notes", notesRoute);

export default app;
