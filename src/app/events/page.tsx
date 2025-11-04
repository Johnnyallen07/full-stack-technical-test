
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useEvents } from '../../hooks/useEvents';

const EVENTS_PER_PAGE = 9;

export default function EventsPage() {
  const { data, error } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  if (error) return <div>Error: {error.message}</div>;

  const events = data?.events || [];

  const filteredEvents = events.filter((event) => {
    const eventTitle = event.title || ''; // Ensure title is not null
    const eventDescription = event.description || ''; // Ensure description is not null
    const matchesSearch = eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) || eventDescription.toLowerCase().includes(searchTerm.toLowerCase());
    // The category filter needs to be adapted based on the actual data structure for category
    // For now, let's assume a simple category string match
    const matchesCategory = category === 'all' || (event as any).category?.id === category;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Events</h1>

      <div className="flex flex-wrap gap-4 mb-8">
        <input
          type="text"
          placeholder="Search events..."
          className="px-4 py-2 border rounded-lg flex-grow"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
        />
        <select
          className="px-4 py-2 border rounded-lg"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1); // Reset to first page on category change
          }}
        >
          <option value="all">All Categories</option>
          <option value="technology">Technology</option>
          <option value="business">Business</option>
          <option value="design">Design</option>
          <option value="marketing">Marketing</option>
          <option value="health">Health</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedEvents.map((event: any) => (
          <div key={event.id} className="border rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-2">
                <div style={{ backgroundColor: event.category?.color }} className="w-3 h-3 rounded-full mr-2"></div>
                <span className="text-sm font-semibold">{event.category?.name}</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-4">{new Date(event.date).toLocaleDateString()}</p>
              <p className="mb-4">{event.description}</p>
              <Link href={`/events/${event.id}`} className="text-blue-500 hover:underline">View Details</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-8">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-lg mr-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg">{currentPage} / {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-lg ml-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
