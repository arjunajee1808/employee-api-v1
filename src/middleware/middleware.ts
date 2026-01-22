import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiAllowedMethods } from "../utils";
import { match } from "path-to-regexp";
import { config } from "../config/index";

const refreshTokens: string[] = []; // In-memory store for refresh tokens (use a database in production)
interface DecodedToken {
  exp?: number;
  iat?: number;
  [key: string]: any;
}

type JWTPayload = DecodedToken | string | jwt.JwtPayload;

// Error handling middleware
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error stack:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
};

// JWT authorization middleware
export const authorizeJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  const secretKey = config.jwt.secret;
  if (!secretKey) {
    console.error("JWT secret is not defined.");
    res
      .status(500)
      .json({ message: "Internal Server Error. JWT secret is not defined." });
    return;
  }
  if (!token) {
    console.warn("Access Denied. No token provided.");
    res.status(401).json({ message: "Access Denied. No token provided." });
    return;
  }

  try {
    const decoded:JWTPayload = jwt.verify(token, secretKey);
    console.log("Token verified successfully:", decoded);
    if (decoded) next();
  } catch (ex) {
    if (ex instanceof Error) {
      // Handles jwt expiresError and jsonWebTokenError
      console.error("Invalid token:", ex.message);
    } else {
      console.error("Invalid token:", ex);
    }
    res.status(400).json({ message: "Invalid token." });
  }
};

// Invalid HTTP method middleware
// Precompile matchers for performance
const matchers = Object.entries(ApiAllowedMethods).map(([pattern, method]) => ({
  matchFn: match(pattern, { decode: decodeURIComponent }),
  method,
}));

export const MethodHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const matched = matchers.find(({ matchFn }) => matchFn(req.path));

  if (!matched || !matched.method.includes(req.method)) {
    console.warn("Method Not Allowed:", req.method, "for", req.path);
    return res
      .status(405)
      .json({ message: "Method Not Allowed", allowedMethods: matched?.method });
  }

  next();
};

// Function to generate JWT and refresh token for claims sent in request
export const generateTokens = (req: Request, res: Response) => {
  const claims = req.body;
  const secretKey = config.jwt.secret;
  const refreshSecretKey = config.jwt.refreshSecret;
  const clientId = config.client.id;
  const clientSecret = config.client.secret;
  const expiresInSeconds = config.jwt.expiresIn; // Default to 5 minutes

  if (!secretKey || !refreshSecretKey) {
    console.error("JWT secret or refresh secret is not defined.");
    res.status(500).json({
      message:
        "Internal Server Error. JWT secret or refresh secret is not defined.",
    });
    return;
  }
  if (!clientId || !clientSecret) {
    console.error("Client ID or Client Secret is not defined.");
    res.status(500).json({
      message:
        "Internal Server Error. Client ID or Client Secret is not defined.",
    });
    return;
  }

  try {
    if (
      req.headers["client_id"] !== clientId ||
      req.headers["client_secret"] !== clientSecret
    ) {
      console.warn("Unauthorized: Invalid client credentials.");
      res
        .status(401)
        .json({ message: "Unauthorized: Invalid client credentials." });
      return;
    }
    const token = jwt.sign(claims, secretKey, { expiresIn: +expiresInSeconds });
    const refreshToken = jwt.sign(claims, refreshSecretKey, {
      expiresIn: "7d",
    });
    refreshTokens.push(refreshToken); // Store refresh token (use a database in production)
    console.log("Tokens generated successfully");
    res.status(200).json({ token, refreshToken });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error generating tokens:", err.message);
    } else {
      console.error("Error generating tokens:", err);
    }
    res.status(500).json({ message: "Error generating tokens." });
  }
};

// Function to refresh JWT using refresh token
export const refreshJWT = (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const secretKey = config.jwt.secret;
  const refreshSecretKey = config.jwt.refreshSecret;

  if (!refreshToken) {
    console.warn("No refresh token provided.");
    res.status(401).json({ message: "No refresh token provided." });
    return;
  }

  if (!secretKey || !refreshSecretKey) {
    console.error("JWT secret or refresh secret is not defined.");
    res.status(500).json({
      message:
        "Internal Server Error. JWT secret or refresh secret is not defined.",
    });
    return;
  }

  if (!refreshTokens.includes(refreshToken)) {
    console.warn("Invalid refresh token.");
    res.status(403).json({ message: "Invalid refresh token." });
    return;
  }

  try {
    const decoded: any = jwt.verify(refreshToken, refreshSecretKey);
    const newToken = jwt.sign({ user_name: decoded.user_name }, secretKey, {
      expiresIn: "15m",
    });
    console.log("Token refreshed successfully");
    res.status(200).json({ token: newToken });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error refreshing token:", err.message);
    } else {
      console.error("Error refreshing token:", err);
    }
    res.status(500).json({ message: "Error refreshing token." });
  }
};
