import type { Request } from "express";
import jwt from "jsonwebtoken";
import type { UserRole } from "./enums/user.enum.js";

export async function expressAuthentication(
  request: Request,
  securityName: string,
): Promise<{ id: string; role: UserRole }> {
  if (securityName !== "jwt") {
    throw new Error(`Esquema de autenticacao desconhecido: ${securityName}`);
  }

  const authHeader = request.headers.authorization;
  const secret = process.env.JWT_SECRET;

  if (!authHeader?.startsWith("Bearer ") || !secret) {
    throw { status: 401, message: "Nao autorizado." };
  }

  try {
    return jwt.verify(authHeader.slice(7), secret) as {
      id: string;
      role: UserRole;
    };
  } catch {
    throw { status: 401, message: "Token invalido ou expirado." };
  }
}
