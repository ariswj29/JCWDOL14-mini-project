'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useRouter } from 'next/navigation';
import { ShowMessage } from '@/components/ShowMessage';
import { promotionSchema } from '@/schema/schema';
import {
  createPromotion,
  getPromotion,
  selectEvent,
  updatePromotion,
} from '@/api/promotion';

const FormPromotion = () => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(promotionSchema),
  });

  const router = useRouter();
  const { id } = useParams();
  const promotionId = Array.isArray(id) ? id[0] : id || null;
  console.log(promotionId, 'userId');
  const [dataMessage, setDataMessage] = useState({
    message: '',
    status: '',
    data: {},
  });
  const [showMessage, setShowMessage] = useState(false);
  const [event, setEvent] = useState([]);
  console.log(event, 'event');

  useEffect(() => {
    if (promotionId != 'add') {
      getPromotion(promotionId || '')
        .then((data) => {
          reset(data.data);
        })
        .catch((error) => {
          console.error('Error fetching promotion:', error);
        });
    }
  }, [promotionId, reset]);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const eventData = await selectEvent();
        setEvent(eventData.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };
    getEvent();
    if (promotionId) {
      reset({ ...watch() });
    }
  }, [promotionId, reset, watch]);

  const formSubmit = async (formData: any) => {
    try {
      const user = localStorage.getItem('user');
      const parsedUser = JSON.parse(user as string);
      const userId = parsedUser.profileId;
      if (promotionId != 'add') {
        const response = await updatePromotion(promotionId || '', {
          ...formData,
          userId,
        });
        setShowMessage(true);
        setDataMessage(response);
      } else {
        const response = await createPromotion({ ...formData, userId });
        setShowMessage(true);
        setDataMessage(response);
      }
      setTimeout(() => {
        setShowMessage(false);
        router.push('/admin/promotions');
      }, 3000);
    } catch (error) {
      console.error('Error creating/updating promotion:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className="container mx-auto px-4">
        {showMessage === true ? (
          <ShowMessage
            name={
              dataMessage.message === 'promotion successfully created'
                ? 'Add Data Success'
                : dataMessage.message === 'promotion successfully updated'
                  ? 'Edit Data Success'
                  : 'Failed'
            }
            desc={dataMessage.message}
            status={dataMessage.status}
            show={showMessage}
          />
        ) : null}
        <div className="text-2xl mb-4">Create Promotion</div>
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="label">Code</label>
          <div className="">
            <input
              className="w-full border p-2"
              {...register('code')}
              placeholder="code"
            />
            {errors.code && (
              <p className="text-sm text-red-500">{errors.code.message}</p>
            )}
          </div>
          <label className="label">Event</label>
          <div className="">
            <select className="w-full border p-2" {...register('eventId')}>
              <option value="" disabled selected>
                Select Event
              </option>
              {event?.map((item: any, index: number) => {
                return (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            {errors.eventId && (
              <p className="text-sm text-red-500">{errors.eventId.message}</p>
            )}
          </div>

          <label className="label">Discount</label>
          <div className="">
            <input
              className="w-full border p-2"
              {...register('discount')}
              placeholder="discount"
            />
            {errors.discount && (
              <p className="text-sm text-red-500">{errors.discount.message}</p>
            )}
          </div>

          <label className="label">Expired Date</label>
          <div className="">
            <input
              type="date"
              className="w-full border p-2"
              {...register('expireAt')}
            />
            {errors.expireAt && (
              <p className="text-sm text-red-500">{errors.expireAt.message}</p>
            )}
          </div>
        </div>

        <div className="formData my-4">
          <input
            className="bg-green-500 px-4 py-2 cursor-pointer text-white rounded"
            type="submit"
            value="Save"
          />
        </div>
      </div>
    </form>
  );
};

export default FormPromotion;
