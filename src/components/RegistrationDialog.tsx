import React, {useState} from 'react';
import {Event, RegistrationRequest} from '../types';
import {useRegisterForEvent} from '../hooks/useEvent';

interface RegistrationDialogProps {
    event: Event;
    onClose: () => void;
}

export const RegistrationDialog: React.FC<RegistrationDialogProps> = ({event, onClose}) => {
    const [attendeeName, setAttendeeName] = useState('');
    const [attendeeEmail, setAttendeeEmail] = useState('');
    const [groupSize, setGroupSize] = useState(1);
    const [error, setError] = useState<string | null>(null);

    const {mutate, isPending} = useRegisterForEvent(event.id);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const registrationData: RegistrationRequest = {
            attendeeName,
            attendeeEmail,
            groupSize,
        };

        mutate(registrationData, {
            onSuccess: () => {
                onClose();
            },
            onError: (error) => {
                setError(error.message);
            },
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Register for {event.title}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            value={attendeeName}
                            onChange={(e) => setAttendeeName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={attendeeEmail}
                            onChange={(e) => setAttendeeEmail(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700">Group Size</label>
                        <input
                            type="number"
                            id="groupSize"
                            value={groupSize}
                            onChange={(e) => setGroupSize(parseInt(e.target.value))}
                            min="1"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={isPending}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={isPending}
                        >
                            {isPending ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
