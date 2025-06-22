import db from "../db-config";
import {Flight} from "../../schemas/flight.schema";

/**
 * This function creates a flight in the database
 * @param flight
 */
export const createFlight = async (flight: Flight) => {
  return await db.one(
    "INSERT INTO flight (flight_name, departure_date, departure_time, destination_airport, airline_prefix, schiphol_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
    [
      flight.flight_name,
      flight.departure_date,
      flight.departure_time,
      flight.destination_airport,
      flight.airline_prefix,
      flight.schiphol_id,
    ],
  );
};

/**
 * This function gets flight details by schiphol id
 * @param id
 */
export const getFlightDetailsBySchipholId = async (id: string) => {
  return await db.oneOrNone("SELECT * FROM flight WHERE schiphol_id = $1", [
    id,
  ]);
};

/**
 * This function gets flight details by id
 */
export const getFlightDetailsById = async (id: number) => {
  return await db.oneOrNone("SELECT * FROM flight WHERE id = $1", [id]);
};
