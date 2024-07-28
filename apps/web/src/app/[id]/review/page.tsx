'use client';

import { getEvent } from '@/api/event';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { Event } from '@/interface/interface';
import { useRouter, useSearchParams } from 'next/navigation';
import { getProfileProcess } from '@/api/profile';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { reviewSchema } from '@/schema/schema';
import { createReview } from '@/api/review';
import CardOrdered from '@/components/CardOrdered';
import { getTransaction } from '@/api/transaction';

export default function ReviewPage(context: any) {
  const { params } = context;
  console.log('params', params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const transactionId = searchParams.get('transactionId');

  const [profile, setProfile] = useState({
    id: 0,
    saldo: 0,
    points: 0,
    discount: 0,
    referralCode: '',
  });
  const [user, setUser] = useState({
    rating: '',
    comment: '',
  });
  const [event, setEvent] = useState<Event | null>(null);
  const [transaction, setTransaction] = useState<any | null>(null);
  console.log(transaction, 'transaction');
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(reviewSchema),
  });

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const user = localStorage.getItem('user');
        if (user) {
          const { profileId } = JSON.parse(user);
          const response = await getProfileProcess(profileId);
          const res = await getTransaction(parseInt(transactionId ?? ''));
          setProfile(response.data);
          setUser(response.data.user);
          setTransaction(res.data);
        } else {
          console.error('User not found');
        }

        if (params?.id) {
          const response = await getEvent(params.id);
          setEvent(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchEventDetails();
  }, [params?.id, router]);

  const formSubmit = async (formData: any) => {
    try {
      const user = localStorage.getItem('user');
      if (user) {
        const { profileId } = JSON.parse(user);
        const response = await createReview({
          userId: profileId,
          eventId: event?.id,
          transactionId,
          ...formData,
        });
        console.log('response', response);
        if (response.status === 'success') {
          alert('Thank you for your order');
          router.push(`/`);
        } else {
          alert('Failed create review');
        }
      }
    } catch (error) {
      console.error('Error creating/updating promotion:', error);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  const formattedDate = format(new Date(event.date), 'd MMMM yyyy', {
    locale: idLocale,
  });

  return (
    <div className="container max-w-screen-xl mx-auto items-center p-12">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        <div className="md:col-span-2 order-2 md:order-1">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800">Review Ordered</h3>
            <form onSubmit={handleSubmit(formSubmit)}>
              <div className="md:grid gap-4">
                <div>
                  <label htmlFor="rating" className="text-base font-medium">
                    Rating
                  </label>
                  <select className="w-full border p-2" {...register('rating')}>
                    <option value="" disabled selected>
                      Select your rating
                    </option>
                    <option>⭐️⭐️⭐️⭐️⭐️</option>
                    <option>⭐️⭐️⭐️⭐️</option>
                    <option>⭐️⭐️⭐️</option>
                    <option>⭐️⭐️</option>
                    <option>⭐️</option>
                  </select>
                  {errors.rating && (
                    <p className="text-sm text-red-500">
                      {errors.rating.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="comment" className="text-base font-medium">
                    Comment
                  </label>
                  <input
                    type="text"
                    id="comment"
                    placeholder="Please leave a review or comment "
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...register('comment')}
                    defaultValue={user.comment}
                  />
                  <span className="text-red-500">
                    {errors.comment?.message}
                  </span>
                </div>
                <div className="formData my-4">
                  <input
                    className="bg-secondary px-4 py-2 cursor-pointer hover:font-bold rounded"
                    type="submit"
                    value="Submit"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <CardOrdered
          event={event}
          date={formattedDate}
          qn={transaction?.qn}
          totalPayment={transaction?.transaction.price}
        />
      </div>
    </div>
  );
}
