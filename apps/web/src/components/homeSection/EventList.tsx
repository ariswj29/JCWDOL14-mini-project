import React from 'react';
import Image from 'next/image';

const events = [
  {
    id: 1,
    thumbnails: '/event1.png',
    title: 'Event One',
    date: '2024-07-10',
    location: 'Jakarta',
    price: 'Rp. 100.000',
  },
  {
    id: 2,
    thumbnails: '/event1.png',
    title: 'Event Two',
    date: '2024-07-12',
    location: 'Jakarta',
    price: 'Rp. 100.000',
  },
  {
    id: 3,
    thumbnails: '/event1.png',
    title: 'Event Three',
    date: '2024-07-15',
    location: 'Jakarta',
    price: 'Rp. 100.000',
  },
  {
    id: 4,
    thumbnails: '/event1.png',
    title: 'Event Four',
    date: '2024-07-20',
    location: 'Jakarta',
    price: 'Rp. 100.000',
  },
  {
    id: 5,
    thumbnails: '/event1.png',
    title: 'Event Five',
    date: '2024-07-22',
    location: 'Jakarta',
    price: 'Rp. 100.000',
  },
  {
    id: 6,
    thumbnails: '/event1.png',
    title: 'Event Six',
    date: '2024-07-25',
    location: 'Jakarta',
    price: 'Rp. 100.000',
  },
  {
    id: 7,
    thumbnails: '/event1.png',
    title: 'Event Seven',
    date: '2024-07-30',
    location: 'Jakarta',
    price: 'Rp. 100.000',
  },
  {
    id: 8,
    thumbnails: '/event1.png',
    title: 'Event Eight',
    date: '2024-08-02',
    location: 'Jakarta',
    price: 'Rp. 100.000',
  },
];

const EventList = () => {
  return (
    <div className="container mx-auto p-12">
      <h1 className="text-3xl font-bold mb-4">Upcoming Events</h1>
      <div className="grid grid-cols-1  lg:grid-cols-4 gap-4 cursor-pointer ">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-4 bg-white hover:bg-secondary shadow-lg rounded-lg border-2 border-secondary transform transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={event.thumbnails}
              alt={event.title}
              width={300}
              height={200}
            />
            <h2 className="text-xl font-semibold pt-4 ">{event.title}</h2>
            <p className="text-gray-600">{event.date}</p>
            <p className="text-gray-600">{event.location}</p>
            <p className="text-gray-600">{event.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
