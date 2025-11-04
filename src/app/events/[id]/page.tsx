
'use client';

import { useEvent } from '@/hooks/useEvent';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { RegistrationDialog } from '@/components/RegistrationDialog';

export default function EventPage() {
  const params = useParams();
  const { id } = params;
  const { data: event, error, isLoading } = useEvent(id as string);
  const [isRegistering, setIsRegistering] = useState(false);

  if (isLoading) return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="bg-gray-300 h-12 w-3/4 mb-4 rounded"></div>
      <div className="bg-gray-300 h-6 w-1/2 mb-4 rounded"></div>
      <div className="bg-gray-300 h-8 w-32 mb-4 rounded-full"></div>
      <div className="bg-gray-300 h-4 w-full mb-2 rounded"></div>
      <div className="bg-gray-300 h-4 w-full mb-2 rounded"></div>
      <div className="bg-gray-300 h-4 w-5/6 mb-4 rounded"></div>
      <div className="bg-gray-300 h-5 w-48 mb-2 rounded"></div>
      <div className="bg-gray-300 h-5 w-40 mb-2 rounded"></div>
      <div className="bg-gray-300 h-5 w-56 rounded"></div>
    </div>
  );
  if (error) return <div>Error: {error.message}</div>;
  if (!event) return (
    <div className="flex items-center justify-center h-screen">
        <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Event Not Found</h1>
            <p className="text-lg text-gray-600">Sorry, the event you are looking for does not exist.</p>
        </div>
    </div>
  );

  const eventDate = new Date(event.date);
  const isFull = event.capacity.registered >= event.capacity.max;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative">
              <img className="h-full w-full object-cover" src={`https://picsum.photos/seed/${event.id}/800/600`} alt={event.title} />
              <div className="absolute inset-0 bg-black opacity-20"></div>
            </div>
            <div className="p-8 md:p-12">
              <div className="mb-4">
                <span className="inline-block rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: event.category.color }}>
                  {event.category.name}
                </span>
              </div>
              <h1 className="text-5xl font-extrabold text-gray-900 mb-4">{event.title}</h1>
              <p className="text-xl text-gray-600 mb-6">
                {isNaN(eventDate.getTime()) ? 'Invalid Date' : eventDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-lg text-gray-800 mb-8">{event.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-100 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Event Details</h3>
                  <p className="text-gray-700"><span className="font-semibold">Location:</span> {event.location.address}</p>
                  <p className="text-gray-700"><span className="font-semibold">Time:</span> {isNaN(eventDate.getTime()) ? 'N/A' : eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Tickets</h3>
                  <p className="text-gray-700"><span className="font-semibold">Price:</span> ${event.pricing.individual}</p>
                  <p className="text-gray-700"><span className="font-semibold">Capacity:</span> {event.capacity.registered} / {event.capacity.max}</p>
                </div>
              </div>

              <div className="mt-10">
                <button 
                  onClick={() => setIsRegistering(true)} 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={isFull}
                >
                  {isFull ? 'Event Full' : 'Register for this Event'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isRegistering && <RegistrationDialog event={event} onClose={() => setIsRegistering(false)} />}
    </div>
  );
}
