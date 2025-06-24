import { z } from "zod";

export const reservationSchema = z.object({
  flight_id: z.string().min(1, "flight_id is required"),
  seat: z.string().min(1, "seat is required"),
  user_id: z.string().min(1, "user_id is required"),
});

export type ReservationInput = z.infer<typeof reservationSchema>;

