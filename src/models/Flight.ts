import db from "../database/db-config";

/**
 * Create a flight table if it doesn't exist
 */
const createFlightTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS Flight (
    id SERIAL PRIMARY KEY,
    flight_name VARCHAR(255),
    departure_date DATE,
    departure_time TIME,
    destination_airport VARCHAR(255),
    airline_prefix VARCHAR(5),
    schiphol_id VARCHAR(255)
    )`;
  try {
    await db.query(query);
    console.log("Flight table created (if not exists)");
  } catch (error) {
    console.error("Error creating flight table:", error);
  }
};

export default createFlightTable;
