import { fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth.js";
import type { Request, Response, NextFunction } from "express";

export async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  console.log("session", session);
  

  if (!session || !session.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  (req as any).user = session.user;
  console.log("user", (req as any).user);
  next();
}
