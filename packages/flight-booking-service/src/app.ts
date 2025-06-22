
// Main application code
import express from "express";
import reservationRoutes from "./routes/reservation-routes";
import flightRoutes from "./routes/flight-routes";
import userRoutes from "./routes/user-routes";


const app = express();
const port = process.env.PORT || 3000;

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
