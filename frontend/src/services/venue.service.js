import { api } from "../api/client.js";

export const getVenues = async (page = 1, filters = {}) => {
  const response = await api.get("/venues", {
    params: {
      page,
      district: filters.district || undefined,
      category: filters.category || undefined,
      minPrice: filters.minPrice || undefined,
      maxPrice: filters.maxPrice || undefined,
    },
  });

  return response;
};