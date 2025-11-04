'use client';

import { useEvent } from '@/hooks/useEvent';
import { useParams } from 'next/navigation';

export default function EventPage() {
  const params = useParams();
  const { id } = params;
  const { data: event, error } = useEvent(id as string);

  if (error) return <div>Error: {error.message}</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
      <p className="text-lg text-gray-600 mb-4">{new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-800">{event.description}</p>
    </div>
  );
}
