import db from "../db-config";

/**
 * Create a reservation
 * @param flightId
 * @param seat
 * @param userId
 * @param status
 */
export const createReservation = async (
  flightId: number,
  seat: string,
  userId: number,
  status: string,
) => {
  return await db.none(
    "INSERT INTO reservation (flight_id, seat, user_id, status) VALUES ($1, $2, $3, $4)",
    [flightId, seat, userId, status],
  );
};

/**
 * Get all reservations for a user
 * @param userId
 */
export const getUserReservations = (userId: number) => {
  return db.any("SELECT * FROM reservation WHERE user_id = $1", [userId]);
};

/**
 * Get all reservations for a user for a specific flight
 * @param userId
 * @param flightId
 */
export const getUserReservationsForFlight = (
  userId: number,
  flightId: number,
) => {
  return db.any(
    "SELECT * FROM reservation WHERE user_id = $1 AND flight_id = $2",
    [userId, flightId],
  );
};

/**
 * Get all reservations
 */
export const getAllReservations = () => {
  return db.any("SELECT * FROM reservation");
};
