import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {Event} from '../types';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_ID = process.env.NEXT_PUBLIC_API_ID;

const fetchEvent = async (id: string): Promise<Event> => {
    const API_URL = `https://${API_ID}.execute-api.us-east-1.amazonaws.com/prod/events/${id}`
    const {data} = await axios.get(API_URL, {
        headers: {
            'x-api-key': API_KEY,
        },
    });
    return data.event;
};

export const useEvent = (id: string) => {
    return useQuery<Event, Error>({
        queryKey: ['event', id],
        queryFn: () => fetchEvent(id),
        enabled: !!id,
    });
};
