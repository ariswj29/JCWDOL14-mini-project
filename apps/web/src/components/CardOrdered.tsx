import { useEffect, useState } from 'react';
import { formattedMoney, totalPrice } from '@/helper/helper';
import Image from 'next/image';
import { FaBan, FaCalendarCheck, FaChair } from 'react-icons/fa';

export default function CardOrdered({ profile, event, date }: any) {
  const [selectedDiscount, setSelectedDiscount] = useState(0);

  const calculateTotalTransaction = () => {
    return totalPrice(event.price, selectedDiscount, profile.points);
  };

  useEffect(() => {
    const totalTransaction = calculateTotalTransaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDiscount, profile.points]);

  const handleDiscountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDiscount(Number(e.target.value));
  };

  return (
    <div className="order-1 md:order-2">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-bold text-gray-800">Your Order</h3>
        <div className="flex justify-center">
          <div className="relative w-full h-40 my-4">
            <Image
              src={`http://localhost:8000/uploads/${event.image}`}
              alt={event.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
        <h4 className="text-xl font-bold">{event.name}</h4>
        <span className="text-base capitalize">
          {event?.location}, {date} : {event.time}
        </span>
        <hr className="my-4" />
        <div className="flex justify-between">
          <h4 className="text-base font-bold">Total Payment</h4>
          <h4 className="text-base font-bold">
            {formattedMoney(calculateTotalTransaction())}
          </h4>
        </div>
      </div>
    </div>
  );
}
