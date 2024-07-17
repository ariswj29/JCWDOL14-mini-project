'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { getEvent } from '@/api/event';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

export default function EventDetails(context: any) {
  interface Event {
    id: number;
    name: string;
    price: number | null;
    date: string;
    location: string;
    image: string;
    isFree: Boolean;
    time: string;
    description: string;
    availableSeats: string;
    categoryId: string;
    userId: string;
    category: {
      id: number;
      name: string;
    };
  }

  const { params } = context;

  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await getEvent(params.id);
        setEvent(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (params?.id) {
      fetchEventDetails();
    }
  }, [params?.id]);

  if (!event) {
    return <div>Loading...</div>; // or any loading indicator
  }

  const formattedDate = format(new Date(event.date), 'd MMMM yyyy', {
    locale: idLocale,
  });
  return (
    <div className="container max-w-screen-xl mx-auto items-center p-12">
      {event.image && (
        <div className="flex justify-center">
          <div className="relative w-full h-96 mb-4">
            <Image
              src={`http://localhost:8000/uploads/${event.image}`}
              alt={event.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      )}
      <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold capitalize">
          {event?.category?.name}
        </span>
        <span className="text-xl capitalize">
          {event?.location}, {event.time}, {formattedDate}
        </span>
      </div>
      <div className="flex justify-between">
        <div>
          <span className="text-xl font-bold pr-4">
            {event.price !== null ? `Rp. ${event.price}` : 'Free'}
          </span>
          <span>{event.price !== null ? 'F̶r̶e̶e̶' : 'Free'}</span>
        </div>
        <div className="flex justify-normal bg-secondary p-2 rounded-md">
          <Image src={'/seat.png'} alt={'seat'} width={20} height={20} />
          <span className="font-semibold">{event.availableSeats}</span>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{event.description}</p>
      <div className="flex justify-center">
        <button className=" bg-secondary px-6 py-1 rounded hover:font-bold">
          Buy
        </button>
      </div>
    </div>
  );
}
