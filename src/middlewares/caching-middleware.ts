import NodeCache from "node-cache";

// Create a new cache instance
export const cache = new NodeCache({ stdTTL: 0, checkperiod: 0 });
