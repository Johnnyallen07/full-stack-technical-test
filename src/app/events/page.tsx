
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useEvents } from "@/hooks/useEvents";
import { Event } from '@/types';

const EVENTS_PER_PAGE = 9;

const EventCardSkeleton = () => (
  <div className="border rounded-lg overflow-hidden animate-pulse">
    <div className="bg-gray-300 h-48 w-full"></div>
    <div className="p-6">
      <div className="flex items-center mb-2">
        <div className="bg-gray-300 w-3 h-3 rounded-full mr-2"></div>
        <div className="bg-gray-300 h-4 w-20 rounded"></div>
      </div>
      <div className="bg-gray-300 h-6 w-3/4 mb-2 rounded"></div>
      <div className="bg-gray-300 h-4 w-1/2 mb-4 rounded"></div>
      <div className="bg-gray-300 h-4 w-full mb-2 rounded"></div>
      <div className="bg-gray-300 h-4 w-full mb-4 rounded"></div>
      <div className="bg-gray-300 h-5 w-24 rounded"></div>
    </div>
  </div>
);

export default function EventsPage() {
  const { data, error, isLoading } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  if (error) return <div>Error: {error.message}</div>;

  const events = data?.events || [];

  const filteredEvents = events.filter((event: Event) => {
    const eventTitle = event.title || '';
    const eventDescription = event.description || '';
    const matchesSearch = eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) || eventDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || event.category.id === category;
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
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Discover Your Next Event</h1>
          <p className="text-xl text-gray-600">Browse through a wide range of events and find what excites you.</p>
        </header>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="text"
              placeholder="Search by event name or description..."
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out col-span-1 md:col-span-2"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(1);
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
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: EVENTS_PER_PAGE }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : paginatedEvents.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedEvents.map((event: Event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                  <Link href={`/events/${event.id}`}>
                    <div className="relative">
                      <img className="h-48 w-full object-cover" src={`https://picsum.photos/seed/${event.id}/400/300`} alt={event.title} />
                      <div className="absolute top-2 left-2">
                        <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-white" style={{ backgroundColor: event.category?.color }}>
                          {event.category?.name}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2 truncate">{event.title}</h2>
                      <p className="text-gray-600 mb-4">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p className="text-gray-700 mb-4 h-20 overflow-hidden text-ellipsis">{event.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">${event.pricing.individual}</span>
                        <span className="text-blue-500 font-semibold hover:underline">View Details &rarr;</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center mt-12">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-6 py-3 bg-white border border-gray-300 rounded-lg mr-4 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>
              <span className="text-lg font-medium text-gray-700">{currentPage} / {totalPages}</span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-6 py-3 bg-white border border-gray-300 rounded-lg ml-4 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">No Events Found</h2>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
