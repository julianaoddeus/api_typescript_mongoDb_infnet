import type { Request, Response, NextFunction } from "express";
import { LogModel } from "../schemas/log.schema.js";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on("finish", async () => {
    const duration = Date.now() - start;

    const log = {
      date: new Date().toISOString(),
      method: req.method,
      path: req.path,
      duration: `${duration}ms`,
    };

    try {
      await LogModel.create(log);
    } catch (error) {
      console.error("Erro ao registrar log:", error);
    }
  });

  next();
};
