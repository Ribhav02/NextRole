import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function createAccessToken(userId) {
  return jwt.sign({ userId }, env.jwtSecret, {
    expiresIn: "7d",
  });
}
