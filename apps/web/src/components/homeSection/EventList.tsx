'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getAllEvents } from '@/api/event';
import Pagination from './pagination';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

interface Event {
  id: number;
  name: string;
  price: number | null;
  date: string;
  location: string;
  image: string;
}

export default function EventList(props: any) {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchEventList = async (page = 1, limit = 4) => {
    try {
      const response = await getAllEvents(
        props.searchEvents,
        props.category,
        props.sort,
        page,
        limit,
      );

      setEvents(response.data);
      setTotalPages(response.total);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEventList();
  }, [props.searchEvents, props.sort, props.category]);

  const handlePageChange = (newPage: number) => {
    console.log(newPage);

    setPage(newPage);
    fetchEventList(newPage);
  };

  return (
    <div className="container mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold mb-4">Upcoming Events</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 cursor-pointer">
        {events.map((event) => {
          const formattedDate = format(new Date(event.date), 'd MMMM yyyy', {
            locale: idLocale,
          });
          return (
            <div
              key={event.id}
              className="p-4 bg-white hover:bg-secondary shadow-lg rounded-lg border-2 border-secondary transform transition-transform duration-300 hover:scale-105"
            >
              <Link href={`/${event.id}`}>
                <Image
                  src={`http://localhost:8000/uploads/${event.image}`}
                  alt={event.name}
                  className="rounded-lg h-48 w-full object-cover"
                  width={500}
                  height={500}
                />
                <h2 className="text-xl font-semibold pt-4">{event.name}</h2>
                <p className="text-gray-600">{formattedDate}</p>
                <p className="text-gray-600">{event.location}</p>
                <p className="text-gray-600">Rp.{event.price}</p>
              </Link>
            </div>
          );
        })}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
