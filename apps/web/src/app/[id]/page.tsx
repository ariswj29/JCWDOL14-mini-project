'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { getEvent } from '@/api/event';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { Event } from '@/interface/interface';

export default function EventDetails(context: any) {
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
    <div className="container max-w-screen-xl mx-auto items-center p-8">
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
      <h1 className="text-3xl font-bold my-2">{event.name}</h1>
      <div className="flex justify-between items-center my-2">
        <span className="font-semibold capitalize">
          {event?.category?.name}
        </span>
        <span className="text-lg capitalize">
          {event?.location}, {formattedDate} : {event.time}
        </span>
      </div>
      <div className="flex justify-between items-center my-2">
        <div>
          <span className="text-xl font-bold pr-4">
            {event.price !== 0 ? `Rp. ${event.price}` : 'Free'}
          </span>
        </div>
        <div className="flex items-center justify-normal bg-secondary p-1 rounded-md">
          <FaUser className="" />
          <span className="font-semibold">{event.availableSeats}</span>
        </div>
      </div>
      <p className="text-gray-700 my-2">{event.description}</p>
      <div className="flex justify-center my-8">
        <Link href={`/${event.id}/order`}>
          <button className=" bg-secondary px-6 py-1 rounded hover:font-bold">
            Buy Ticket
          </button>
        </Link>
      </div>
    </div>
  );
}
