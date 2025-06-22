import { z } from "zod";

export const FlightSchema = z.object({
    schiphol_id: z.string(),
    flight_name: z.string(),
    departure_date: z.string(),
    departure_time: z.string(),
    destination_airport: z.string(),
    airline_prefix: z.string(),
});

export type Flight = z.infer<typeof FlightSchema>;
