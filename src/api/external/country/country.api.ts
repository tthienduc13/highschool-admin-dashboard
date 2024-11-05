import axios from 'axios';
import { Province } from './country.type';
import { externalEndpoint } from '@/helpers/endpoint';

export const getProvince = async (): Promise<Province[]> => {
  try {
    const { data } = await axios.get(`${externalEndpoint.GET_PROVINCE}`);
    return data;
  } catch (error) {
    console.error('Error fetching provinces:', error);
    throw new Error('Failed to fetch provinces');
  }
};
