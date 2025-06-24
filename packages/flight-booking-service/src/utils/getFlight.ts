import { callApi } from "../../../node-utils-package/src/functions/call-api";
import {flightApiInstance} from "../api/flight.instance.api";

export const getFlightById = async (flightId: string) => {
    const url = `/flights/${flightId}`;
    return await callApi(
        flightApiInstance,
        url,
        {},
        (res) => console.log('Success:', res.status),
        (err) => console.error('Error:', err)
    );
};