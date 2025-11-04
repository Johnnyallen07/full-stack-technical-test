import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios, {AxiosError} from 'axios';
import {Event, RegistrationRequest, RegistrationResponse} from '../types';

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

const registerForEvent = async ({id, registrationData}: { id: string, registrationData: RegistrationRequest }): Promise<RegistrationResponse> => {
    const API_URL = `https://${API_ID}.execute-api.us-east-1.amazonaws.com/prod/events/${id}/register`
    try {
        const {data} = await axios.post(API_URL, registrationData, {
            headers: {
                'x-api-key': API_KEY,
            },
        });
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<{ message: string }>;
            if (serverError.response) {
                throw new Error(serverError.response.data.message);
            }
        }
        throw new Error('An unexpected error occurred');
    }
}

export const useEvent = (id: string) => {
    return useQuery<Event, Error>({
        queryKey: ['event', id],
        queryFn: () => fetchEvent(id),
        enabled: !!id,
    });
};

export const useRegisterForEvent = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation<RegistrationResponse, Error, RegistrationRequest>({
        mutationFn: (registrationData) => registerForEvent({id, registrationData}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['event', id]});
        },
    });
}
