/**
 * Extract the URL for the next page from pagination headers
 */
export const extractNextPageUrl = (header: string) => {
  return header
    .split(",")
    .map(h => h.split(";"))
    .find(h => h[1]?.split("=")[1]?.replace(/"/g, "") === "next")
    ?.[0]
    .replace(/[<>]/g, "") || null;
};
