import { api } from '../api/client.js';

export const getOwnerVenues = async ({ status, page = 1, limit = 10 } = {}) => {
  const params = new URLSearchParams({ page, limit });
  if (status) params.set('status', status);
  const res = await api.get(`/venueOwner/venues?${params}`);
  return res; // { data, pagination }
};

export const getOwnerVenueCount = async ({ status } = {}) => {
  const params = new URLSearchParams({ countOnly: 'true' });
  if (status) params.set('status', status);
  const res = await api.get(`/venueOwner/venues?${params}`);
  return res.data.total;
};

export const addVenue = async (payload) => {
  const res = await api.post('/venueOwner/venues', payload);
  return res.data;
};

export const submitVenue = async (id) => {
  const res = await api.post(`/venueOwner/venues/submit/${id}`);
  return res.data;
};

export const updateVenue = async (id, payload) => {
  const res = await api.patch(`/venueOwner/venues/update/${id}`, payload);
  return res.data;
};

export const setVenueVisibility = async (id, isActive) => {
  const res = await api.patch(`/venueOwner/venues/visibility/${id}`, { isActive });
  return res.data;
};

export const deleteVenue = async (id) => {
  const res = await api.del(`/venueOwner/venues/delete/${id}`);
  return res.data;
};
