import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

/**
 * General validation middleware for Express using Zod schemas.
 * @param schema Zod schema to validate against.
 * @param property Request property to validate ("body", "query", "params").
 */
export function validateRequest<T>(
  schema: ZodSchema<T>,
  property: "body" | "query" | "params" = "body"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[property]);
    if (!result.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: result.error.errors,
      });
    }
    req[property] = result.data;
    next();
  };
}

