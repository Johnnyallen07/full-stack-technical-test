
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_KEY = 'tlGUZ1qg14U22eY10bm73JYK7wd61kUeQBWFM570';
// You need to replace this with your actual API Gateway ID
const API_ID = 'x15zoj9on9';
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
