import { Request, Response } from "express";
import api from "../middlewares/schiphol-middleware";
import { SchipholApiResponse } from "../../types/schiphol-types";
import { extractNextPageUrl } from "../utils/extract-next-page-url";
import { cache } from "../middlewares/caching-middleware";
import * as flightQueries from "../database/queries/flight-queries";

// Create an array to store all data
const allData: SchipholApiResponse[] = [];

/**
 * Fetch all pages from the API
 * @param pagePath
 */
const fetchAllPages = async (pagePath: string) => {
  const newData = await api
    .get(pagePath)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
  allData.push(newData.data);
  const paginationHeaders = newData.headers["link"];
  const nextPageUrl = extractNextPageUrl(paginationHeaders);
  // If there's a next page URL, make another request
  if (nextPageUrl) {
    console.log("Fetching page:", nextPageUrl);
    const url = new URL(nextPageUrl);
    const nextPagePath = url.pathname + url.search;
    await fetchAllPages(nextPagePath);
  }
  // Return the flattened array
  return allData.flat(1);
};

/**
 * Get all flights from Schiphol API
 * @param req
 * @param res
 */
export const listFlights = async (req: Request, res: Response) => {
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
};

/**
 * Get a single flight by ID from Schiphol API
 * @param id
 */
export const getFlight = async (id: string) => {
  const flightId = id;
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
};

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
