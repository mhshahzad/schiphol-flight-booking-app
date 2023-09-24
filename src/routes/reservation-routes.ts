import express from "express";
import * as reservationController from "../controllers/reservation-controller";

const router = express.Router();

// Reservation routes
router.get("/", reservationController.getAllReservations);

export default router;
