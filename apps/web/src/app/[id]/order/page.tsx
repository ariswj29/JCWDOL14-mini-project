'use client';

import { getEvent } from '@/api/event';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { Event } from '@/interface/interface';
import { useRouter } from 'next/navigation';
import { getProfileProcess } from '@/api/profile';
import CardPayment from '@/components/CardPayment';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { orderTicketSchema } from '@/schema/schema';

export default function OrderPage(context: any) {
  const { params } = context;
  const router = useRouter();
  const [profile, setProfile] = useState({
    id: 0,
    saldo: 0,
    points: 0,
    discount: 0,
    referralCode: '',
  });
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
  });
  const [event, setEvent] = useState<Event | null>(null);

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(orderTicketSchema),
  });

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const user = localStorage.getItem('user');
        if (!user) {
          alert('Please login first to continue the order');
          router.push('/login');
        }
        if (user) {
          const { profileId } = JSON.parse(user);
          const response = await getProfileProcess(profileId);

          setProfile(response.data);
          setUser(response.data.user);
        } else {
          console.error('User not found');
        }

        const response = await getEvent(params.id);
        setEvent(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (params?.id) {
      fetchEventDetails();
    }
  }, [params?.id, router]);

  const formSubmit = async (formData: any) => {
    console.log(formData);
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  const formattedDate = format(new Date(event.date), 'd MMMM yyyy', {
    locale: idLocale,
  });
  return (
    <div className="container max-w-screen-xl mx-auto items-center p-12">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Ordered Details
            </h3>
            <form className="mt-4" onSubmit={handleSubmit(formSubmit)}>
              <div className="grid gap-4">
                <div>
                  <label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="First Name"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...register('firstName')}
                    defaultValue={user.firstName}
                  />
                  <span className="text-red-500">
                    {errors.firstName?.message}
                  </span>
                </div>
                <div>
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...register('lastName')}
                    defaultValue={user.lastName}
                  />
                  <span className="text-red-500">
                    {errors.lastName?.message}
                  </span>
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...register('email')}
                    defaultValue={user.email}
                  />
                  <span className="text-red-500">{errors.email?.message}</span>
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    placeholder="Phone Number"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...register('phoneNumber')}
                    defaultValue={user.phoneNumber}
                  />
                  <span className="text-red-500">
                    {errors.phoneNumber?.message}
                  </span>
                </div>
                <div>
                  <label htmlFor="address" className="text-sm font-medium">
                    Address
                  </label>
                  <textarea
                    id="address"
                    placeholder="Address"
                    className="w-full h-[6.5rem] p-2 border border-gray-300 rounded-md"
                    {...register('address')}
                    defaultValue={user.address}
                  />
                  <span className="text-red-500">
                    {errors.address?.message}
                  </span>
                </div>
                <input
                  className={`bg-secondary px-4 py-2 rounded-md ${profile.saldo <= (event?.price || 0) ? 'opacity-50 cursor-not-allowed' : 'hover:font-bold cursor-pointer'}`}
                  type="submit"
                  disabled={profile.saldo <= (event?.price || 0)}
                  value={
                    profile.saldo <= (event?.price || 0)
                      ? "Can't checkout because saldo is not enough"
                      : 'Checkout'
                  }
                />
              </div>
            </form>
          </div>
        </div>
        <CardPayment
          profile={profile}
          event={event}
          formattedDate={formattedDate}
        />
      </div>
    </div>
  );
}
