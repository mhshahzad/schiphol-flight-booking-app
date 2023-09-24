import { Request, Response, NextFunction } from "express";

/**
 * Validates the reservation request
 * @param req
 * @param res
 * @param next
 */
export const validateReservation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { flight_id, seat, user_id } = req.body;
  
  // Check if the required fields are present
  if (!flight_id || !seat || !user_id) {
    return res.status(400).json({
      error: "flight_id, seat and user_id are marked as required fields",
    });
  }

  next();
};
