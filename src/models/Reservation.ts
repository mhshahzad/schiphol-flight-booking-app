import db from "../database/db-config";

/**
 * Create a reservation table if it doesn't exist
 */
const createReservationTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS Reservation (
    reservation_id SERIAL PRIMARY KEY,
    flight_id INT,
    user_id INT,
    seat VARCHAR(3),
    status VARCHAR(255),
    reservation_date DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (flight_id) REFERENCES Flight(id))`;

  try {
    await db.query(query);
    console.log("Reservation table created (if not exists)");
  } catch (error) {
    console.error("Error creating reservation table:", error);
  }
};

export default createReservationTable;
