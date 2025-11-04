
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_KEY = process.env.API_KEY;
const API_ID = process.env.API_ID;
const API_URL = `https://${API_ID}.execute-api.us-east-1.amazonaws.com/prod/events`;

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  // Add other event properties here based on the openapi.yaml spec
}

interface EventsResponse {
  events: Event[];
  total: number;
  lastKey?: string;
}

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
