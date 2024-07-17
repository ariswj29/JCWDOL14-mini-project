'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getAllEvents, getPagination } from '@/api/event';
import Pagination from './pagination';

export default function EventList() {
  interface Event {
    id: number;
    name: string;
    price: number | null;
    date: string;
    location: string;
    image: string;
  }

  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const formatDate = (dateString: string) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  useEffect(() => {
    const fetchEventList = async () => {
      try {
        const response = await getAllEvents(events);
        const data = await getPagination(page, 4);

        setEvents(response.data);
        setTotalPages(data.pages);
        console.log(data.pages, 'hahahha');
      } catch (error) {
        console.error(error);
      }
    };
    fetchEventList();
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="container mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold mb-4">Upcoming Events</h1>
      <div className="grid grid-cols-1  lg:grid-cols-4 gap-4 cursor-pointer ">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-4 bg-white hover:bg-secondary shadow-lg rounded-lg border-2 border-secondary transform transition-transform duration-300 hover:scale-105"
          >
            <Link href={`/${event.id}`}>
              <Image
                src={`http://localhost:8000/uploads/${event.image}`}
                alt={event.name}
                width={300}
                height={200}
              />
              <h2 className="text-xl font-semibold pt-4 ">{event.name}</h2>
              <p className="text-gray-600">{formatDate(event.date)}</p>
              <p className="text-gray-600">{event.location}</p>
              <p className="text-gray-600">{event.price}</p>
            </Link>
          </div>
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
