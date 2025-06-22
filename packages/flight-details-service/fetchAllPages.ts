import { SchipholApiResponse } from "../../types/schiphol-types";
import api from "./src/api/schiphol-api";
import {extractNextPageUrl} from "./src/utils/extract-next-page-url";

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


