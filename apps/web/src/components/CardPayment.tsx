import { useEffect, useState } from 'react';
import { formattedMoney, totalPrice } from '@/helper/helper';
import Image from 'next/image';
import { FaBan, FaCalendarCheck, FaChair } from 'react-icons/fa';

export default function CardPayment({
  profile,
  event,
  date,
  onTotalTransactionChange,
}: any) {
  const [selectedDiscount, setSelectedDiscount] = useState(0);

  const calculateTotalTransaction = () => {
    return totalPrice(event.price, selectedDiscount, profile.points);
  };

  useEffect(() => {
    const totalTransaction = calculateTotalTransaction();
    onTotalTransactionChange(totalTransaction);
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
        <div className="grid grid-cols-2 gap-4">
          <div className="items-center my-1">
            <h4 className="text-base font-bold">
              Price:{' '}
              {event.price !== 0 ? `${formattedMoney(event.price)}` : 'Free'}
            </h4>
            <h4 className="text-base font-bold">Points: {profile.points}</h4>
            {event.promotion.length > 0 && (
              <h4 className="text-base font-bold">
                Discount: <br />
                <select
                  className="w-full text-sm border border-gray-300 rounded-md"
                  onChange={handleDiscountChange}
                  value={selectedDiscount}
                >
                  <option value={0} selected disabled>
                    Choose promo
                  </option>
                  {event.promotion.map((promo: any) => (
                    <option key={promo.id} value={promo.discount}>
                      {promo.code} ({promo.discount}%)
                    </option>
                  ))}
                </select>
              </h4>
            )}
          </div>
          <div className="grid border-2 border-gray-200 rounded-md items-center text-center">
            <h4 className="text-base font-bold">Your Saldo</h4>
            <h4
              className={`text-base font-bold ${
                profile.saldo <=
                totalPrice(event.price, selectedDiscount, profile.points)
                  ? 'text-red-500'
                  : null
              }`}
            >
              {formattedMoney(profile.saldo)}
            </h4>
            <span className="text-xs text-red-500">
              {profile.saldo <=
              totalPrice(event.price, selectedDiscount, profile.points)
                ? ' (Saldo is not enough)'
                : null}
            </span>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex items-center my-1">
          <FaBan className="mr-2" />{' '}
          <span className="font-medium text-sm">Can{`'`}t fund</span>
        </div>
        <div className="flex items-center my-1">
          <FaChair className="mr-2" />{' '}
          <div className="flex flex-col">
            <span className="font-medium text-sm">
              Seats are selected automatically
            </span>
            <span className="text-sm text-gray-500">
              The system will choose a seat number.
            </span>
          </div>
        </div>
        <div className="flex items-center my-1">
          <FaCalendarCheck className="mr-2" />{' '}
          <span className="font-medium text-sm">
            Valid on the selected date
          </span>
        </div>
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
