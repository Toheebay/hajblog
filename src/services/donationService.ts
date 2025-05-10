
import api from './api';

export interface Donation {
  id?: string;
  donor: {
    name: string;
    email: string;
    userId?: string;
  };
  amount: number;
  message?: string;
  status?: 'pending' | 'completed' | 'failed';
  createdAt?: string;
}

export const getDonations = async () => {
  const response = await api.get('/donations');
  return response.data;
};

export const createDonation = async (donationData: Donation) => {
  const response = await api.post('/donations', donationData);
  return response.data;
};

export const updateDonationStatus = async (id: string, status: string) => {
  const response = await api.patch(`/donations/${id}`, { status });
  return response.data;
};
