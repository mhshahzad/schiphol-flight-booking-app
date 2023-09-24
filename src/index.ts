import fs from "fs";
import dotenv from "dotenv";

// Check if a path to the .env file is provided as a command-line argument
const envFilePath = process.argv[2]; // process.argv[0] is the node binary, and process.argv[1] is the script file

// Check if the provided path exists and is a file
if (envFilePath && fs.existsSync(envFilePath) && fs.statSync(envFilePath).isFile()) {
  // Load environment variables from the provided .env file path
  dotenv.config({ path: envFilePath });
} else {
  console.error('Invalid or missing .env file path');
  process.exit(1);
}

// Main application code
import express from "express";
import reservationRoutes from "./routes/reservation-routes";
import flightRoutes from "./routes/flight-routes";
import userRoutes from "./routes/user-routes";
import createReservationTable from "./models/Reservation";
import createFlightTable from "./models/Flight";


const app = express();
const port = process.env.PORT;

// Initialize tables, if they don't exist
// To create reservation table, flight table must exist
createFlightTable().then(() => createReservationTable());

// Middlewares
app.use(express.json());

// Routes
app.use("/flights", flightRoutes);
app.use("/reservations", reservationRoutes);
app.use("/users", userRoutes);

// Start your Express.js server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
