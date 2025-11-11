// backend/src/middlewares/auth.middleware.js

import jwt from "jsonwebtoken";

const JWT_SECRET = "SUA_CHAVE_SECRETA_SUPER_LONGA";

export function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Acesso negado. Token não fornecido." });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Token mal formatado." });
  }

  const token = parts[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    req.user = payload;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
}
