
import api from './api';
import { Item } from '@/data/items';

export const getListings = async () => {
  const response = await api.get('/listings');
  return response.data;
};

export const getListing = async (id: string) => {
  const response = await api.get(`/listings/${id}`);
  return response.data;
};

export const createListing = async (listingData: Partial<Item>) => {
  const response = await api.post('/listings', listingData);
  return response.data;
};

export const updateListing = async (id: string, listingData: Partial<Item>) => {
  const response = await api.patch(`/listings/${id}`, listingData);
  return response.data;
};

export const deleteListing = async (id: string) => {
  const response = await api.delete(`/listings/${id}`);
  return response.data;
};
