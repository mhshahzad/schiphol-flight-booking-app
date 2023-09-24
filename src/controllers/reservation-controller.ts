import { Request, Response } from "express";
import * as reservationQueries from "../database/queries/reservation-queries";
import * as flightQueries from "../database/queries/flight-queries";
import { cache } from "../middlewares/caching-middleware";
import { getFlight } from "./flight-controller";
import { Flight } from "../../types/schiphol-types";

/**
 * Reserves a flight seat for a user
 * @param req
 * @param res
 */
export const reserveFlight = async (req: Request, res: Response) => {
  try {
    const { flight_id, seat, user_id } = req.body;
    const flightDetails: Flight = await getFlight(flight_id);

    // Check if the flight exists
    if (!flightDetails) {
      return res.status(404).json({ error: "Flight not found" });
    }

    // Check if a flight direction is correct
    const flightDirection = flightDetails.flightDirection;
    if (flightDirection !== "D") {
      return res.status(400).json({ error: "Flight direction is not correct" });
    }
    
    // Check if the seat is available
    const seatAlreadyReserved = cache.has(`seat:${seat}`);
    if (seatAlreadyReserved) {
      return res.status(409).json({ error: "Seat is already reserved" });
    }
    
    // Check if flight already exists in the database
    const foundFlight = await flightQueries.getFlightDetailsBySchipholId(
      flightDetails.id!,
    );
    let flightID = foundFlight?.id;

    if (flightID) {
      // Check if a reservation for a user already exists for the flight
      const reservations =
        await reservationQueries.getUserReservationsForFlight(
          parseInt(user_id),
          parseInt(flightID),
        );
      if (reservations.length > 0) {
        return res
          .status(400)
          .json({
            error: "Reservation already exists for the user on this flight",
          });
      }
    }

    // Create a new flight if it doesn't exist
    if (!foundFlight) {
      const createdFlight = await flightQueries.createFlight({
        flight_name: flightDetails.flightName!,
        departure_date: flightDetails.scheduleDate!,
        departure_time: flightDetails.scheduleTime!,
        destination_airport: flightDetails?.route!.destinations!.join(","),
        airline_prefix: flightDetails.prefixICAO!,
        schiphol_id: flightDetails.id!,
      });
      flightID = createdFlight.id;
    }

    // Create a reservation
    await reservationQueries.createReservation(
      flightID,
      seat,
      user_id,
      "CONFIRMED",
    );

    // Mark the seat as unavailable
    cache.set(`seat:${seat}`, user_id);

    return res.json({ message: "Reservation successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Gets all reservations for a user
 * @param req
 * @param res
 */
export const getUserReservations = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const reservations = await reservationQueries.getUserReservations(
      parseInt(user_id),
    );
    return res.json(reservations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Gets all reservations regardless of user
 * @param req
 * @param res
 */
export const getAllReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await reservationQueries.getAllReservations();
    return res.json(reservations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
