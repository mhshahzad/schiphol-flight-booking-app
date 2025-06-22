import express from "express";

const router = express.Router();

// Flight routes
router.get("/", async (req, res) => {
    // D = departing, A = arriving
    // Refer to https://developer.schiphol.nl/apis/flight-api/v4/flights?version=latest#/ for more info on flight-controller
    const direction = req.query.direction || "D";
    const date = req.query.date;
    try {
        const cachedFlights = cache.get("flights");
        if (cachedFlights !== undefined) {
            console.log("Serving from cache...");
            return res.json(cachedFlights);
        } else {
            console.log("Fetching from API...");
            const path = `/public-flights/flights?flightDirection=${direction}`;
            // If a date is provided, add it to the path
            if (date) {
                path.concat(`&scheduleDate=${date}`);
            }
            const fetchAllFlights = await fetchAllPages(path).then((data) => {
                return data[0];
            });
            console.log("Done fetching all pages, setting cache...");
            cache.set("flights", fetchAllFlights);
            console.log("Serving from API...");
            return res.json(fetchAllFlights);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/:id", async (req, res) => {
    const flightId = req.query.id;
    try {
        const cachedFlight = cache.get(flightId);
        if (cachedFlight !== undefined) {
            console.log("Serving from cache...");
            return cachedFlight;
        } else {
            console.log("Fetching from API...");
            const path = `/public-flights/flights/${flightId}`;
            const fetchFlight = await api
                .get(path)
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    throw error;
                });
            console.log("Done fetching flight, setting cache...");
            cache.set(flightId, fetchFlight, 180);
            console.log("Serving from API...");
            return fetchFlight;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
})


export default router;
