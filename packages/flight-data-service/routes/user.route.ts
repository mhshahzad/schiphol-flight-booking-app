import express from "express";
import axios from "axios";

const router = express.Router();
const DATA_SERVICE_URL = process.env.DATA_SERVICE_URL || "http://localhost:5000";

router.get(
    "/:user_id/flight-details/:flight_id",
    async (req, res) => {
        try {
            const response = await axios.get(
                `${DATA_SERVICE_URL}/users/${req.params.user_id}/flight-details/${req.params.flight_id}`,
            );
            res.json(response.data);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch flight details" });
        }
    },
);

export default router;
