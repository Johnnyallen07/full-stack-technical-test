
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { EventsResponse } from '../types';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_ID = process.env.NEXT_PUBLIC_API_ID;
const API_URL = `https://${API_ID}.execute-api.us-east-1.amazonaws.com/prod/events`;

const fetchEvents = async (): Promise<EventsResponse> => {
  const { data } = await axios.get(API_URL, {
    headers: {
      'x-api-key': API_KEY,
    },
  });
  return data;
};

export const useEvents = () => {
  return useQuery<EventsResponse, Error>({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });
};
