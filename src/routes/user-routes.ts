import express from "express";
import * as reservationController from "../controllers/reservation-controller";
import * as flightController from "../controllers/flight-controller";

const router = express.Router();

// User routes
router.get("/:user_id/reservations", reservationController.getUserReservations);
router.get(
  "/:user_id/flight-details/:flight_id",
  flightController.getFlightDetails,
);

export default router;
