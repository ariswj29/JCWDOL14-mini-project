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
    <div className="container mx-auto p-4">
      {event.image && (
        <div className="flex justify-center">
          <Image
            src={`http:localhost:8000/uploads/${event.image}`}
            alt={event.name}
            width={800}
            height={400}
            objectFit="cover"
            className="mb-4"
          />
        </div>
      )}
      <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold">{event?.categoryId}</span>
        <span className="text-xl">
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
