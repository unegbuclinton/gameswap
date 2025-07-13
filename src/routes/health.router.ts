import { Router } from "express";
import { Request, Response } from "express";

const healthRouter = Router();

healthRouter.get("/", (_req: Request, res: Response) => {
  res.send("API is healthy ✅");
});

export default healthRouter;
