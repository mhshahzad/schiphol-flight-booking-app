/**
 * Get flight details by ID
 * @param req
 * @param res
 */
export const getFlightDetails = async (req: Request, res: Response) => {
    const { flight_id } = req.params;
    try {
        const flightDetails = await flightQueries.getFlightDetailsById(
            parseInt(flight_id),
        );
        return res.json(flightDetails);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
