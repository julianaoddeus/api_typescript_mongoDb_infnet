import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ValidateError } from "@tsoa/runtime";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ValidateError) {
    return res.status(400).json({
      message: "Erro de validação.",
      errors: Object.entries(err.fields).map(([field, error]) => ({
        field,
        message: error.message,
      })),
    });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      message: "Erro de validação.",
      errors: Object.values(err.errors).map((error) => ({
        field: error.path,
        message: error.message,
      })),
    });
  }

  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      message: "Erro de validação.",
      errors: [{ field: err.path, message: err.message }],
    });
  }

  return res.status(500).json({
    message: "Erro interno do servidor.",
  });
}
