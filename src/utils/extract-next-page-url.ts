/**
 * Function to extract the URL for the next page from pagination headers
 * @returns string | null
 * @param header
 */
export const extractNextPageUrl = (header: string) => {
  const paginationHeaders = header.split(",");
  for (let i = 0; i < paginationHeaders.length; i++) {
    const header = paginationHeaders[i].split(";");
    const link = header[0].replace(">", "").replace("<", "");
    const rel = header[1].split("=")[1].replace(/"/g, "");
    if (rel === "next") {
      return link;
    }
  }
  return null;
};
