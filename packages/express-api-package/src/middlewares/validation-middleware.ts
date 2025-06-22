import { Request, Response, NextFunction } from "express";
import { reservationSchema } from "../schemas/reservation-schema";

/**
 * Validates the reservation request using Zod schema
 */
export const validateReservation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = reservationSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: result.error.errors.map(e => e.message).join(", "),
    });
  }
  next();
};
