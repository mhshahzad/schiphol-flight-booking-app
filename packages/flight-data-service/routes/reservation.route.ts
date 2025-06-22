


// User routes
router.get("/:user_id/reservations", async (req, res) => {
    try {
        const response = await axios.get(
            `${DATA_SERVICE_URL}/users/${req.params.user_id}/reservations`,
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user reservations" });
    }
});

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
