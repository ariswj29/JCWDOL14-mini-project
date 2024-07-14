'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getAllEvents } from '@/api/event';

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

  useEffect(() => {
    const fetchEventList = async () => {
      try {
        const response = await getAllEvents(events);
        setEvents(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEventList();
  }, []);

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
              <p className="text-gray-600">{event.date}</p>
              <p className="text-gray-600">{event.location}</p>
              <p className="text-gray-600">{event.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
