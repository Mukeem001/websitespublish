import jwt from "jsonwebtoken";
import env from "../config/env";

export interface JwtPayload {
  userId: string;
  email: string;
  role: "user" | "admin";
}

export const generateAccessToken = (
  payload: JwtPayload
): string => {
  return jwt.sign(
    payload,
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn as jwt.SignOptions["expiresIn"],
    }
  );
};

export const verifyAccessToken = (
  token: string
): JwtPayload => {
  return jwt.verify(
    token,
    env.jwtSecret
  ) as JwtPayload;
};