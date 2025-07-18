import { Request, Response, NextFunction } from "express";

// Central error handler middleware
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("❌ Error:", err.stack || err.message);

  res.status(500).json({
    error: "Something went wrong. Please try again later.",
    message: err.message // Optional: remove in production for cleaner output
  });
};
