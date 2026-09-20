import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      message: "Erro de validação.",
      errors: Object.values(err.errors).map((error) => ({
        field: error.path,
        message: error.message,
      })),
    });
  }

  return res.status(500).json({
    message: "Erro interno do servidor.",
  });
}
