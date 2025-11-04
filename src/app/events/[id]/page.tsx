'use client';

import { useEvent } from '@/hooks/useEvent';
import { useParams } from 'next/navigation';

export default function EventPage() {
  const params = useParams();
  const { id } = params;
  const { data: event, error, isLoading } = useEvent(id as string);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!event) return <div>Event not found</div>;

  const eventDate = new Date(event.date);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
      <p className="text-lg text-gray-600 mb-4">
        {isNaN(eventDate.getTime()) ? 'Invalid Date' : eventDate.toLocaleDateString()}
      </p>
      <div className="mb-4">
        <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-white mr-2" style={{ backgroundColor: event.category.color }}>
          {event.category.name}
        </span>
      </div>
      <p className="text-gray-800 mb-2">{event.description}</p>
      <p className="text-gray-700 mb-2">
        Capacity: {event.capacity.registered} / {event.capacity.max}
      </p>
      <p className="text-gray-700 mb-2">Price: ${event.pricing.individual}</p>
      <p className="text-gray-700 mb-2">Location: {event.location.address}</p>
    </div>
  );
}
