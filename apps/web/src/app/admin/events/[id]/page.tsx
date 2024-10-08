'use client';

import { createEvents, getEvent, updateEvent } from '@/api/event';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useRouter } from 'next/navigation';
import { ShowMessage } from '@/components/ShowMessage';
import { eventSchema } from '@/schema/schema';

const FormEvents = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(eventSchema),
  });

  const router = useRouter();
  const { id } = useParams();
  const eventId = Array.isArray(id) ? id[0] : id || null;
  const [dataMessage, setDataMessage] = useState({
    message: '',
    status: '',
    data: {},
  });
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (eventId !== 'add') {
      getEvent(eventId || '')
        .then((data) => {
          const eventData = data.data;
          if (eventData.date) {
            eventData.date = new Date(eventData.date)
              .toISOString()
              .split('T')[0];
          }
          reset(eventData);
        })
        .catch((error) => {
          console.error('Error fetching event:', error);
        });
    }
  }, [eventId, reset]);

  const formSubmit = async (formData: any) => {
    const data = new FormData();
    const user = localStorage.getItem('user');
    const { profileId } = JSON.parse(user as string);
    formData.userId = profileId;
    console.log(data, 'data');
    console.log(formData, 'formData');

    for (const key in formData) {
      if (key === 'image' && formData[key].length > 0) {
        data.append(key, formData[key][0]);
      } else {
        data.append(key, formData[key]);
      }
    }

    let response;
    if (eventId !== 'add') {
      response = await updateEvent(eventId || '', data);
    } else {
      response = await createEvents(data);
    }

    setShowMessage(true);
    setDataMessage(response);

    setTimeout(() => {
      setShowMessage(false);
      router.push('/admin/events');
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className="container mx-auto px-4">
        {showMessage === true && (
          <ShowMessage
            name={
              dataMessage.message === 'Event successfully created'
                ? 'Add Data Success'
                : dataMessage.message === 'Event successfully updated'
                  ? 'Edit Data Success'
                  : 'Failed'
            }
            desc={dataMessage.message}
            status={dataMessage.status}
            show={showMessage}
          />
        )}
        <div className="text-2xl mb-4">Table Events</div>
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="label">Name</label>
          <div>
            <input
              className="w-full border p-2"
              {...register('name')}
              placeholder="event name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <label className="label">Image</label>
          <div>
            <input
              type="file"
              className="w-full border p-2"
              {...register('image')}
            />
            {errors.image && (
              <p className="text-sm text-red-500">{errors.image.message}</p>
            )}
          </div>

          <label className="label">Free Event</label>
          <div>
            <select className="w-full border p-2" {...register('isFree')}>
              <option value="" disabled selected>
                Select is event set free
              </option>
              <option value="true">Free</option>
              <option value="false">Paid</option>
            </select>
            {errors.isFree && (
              <p className="text-sm text-red-500">{errors.isFree.message}</p>
            )}
          </div>

          <label className="label">Price</label>
          <div>
            <input
              className="w-full border p-2"
              {...register('price')}
              placeholder="price"
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          <label className="label">Date</label>
          <div>
            <input
              type="date"
              className="w-full border p-2"
              {...register('date')}
            />
            {errors.date && (
              <p className="text-sm text-red-500">{errors.date.message}</p>
            )}
          </div>

          <label className="label">Time</label>
          <div>
            <input
              className="w-full border p-2"
              type="text"
              {...register('time')}
              placeholder="time"
            />
            {errors.time && (
              <p className="text-sm text-red-500">{errors.time.message}</p>
            )}
          </div>

          <label className="label">Location</label>
          <div>
            <input
              className="w-full border p-2"
              {...register('location')}
              placeholder="location"
            />
            {errors.location && (
              <p className="text-sm text-red-500">{errors.location.message}</p>
            )}
          </div>

          <label className="label">Description</label>
          <div>
            <textarea
              className="w-full h-[6.5rem] border p-2"
              {...register('description')}
              placeholder="description"
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <label className="label">Available Seats</label>
          <div>
            <input
              className="w-full border p-2"
              type="number"
              {...register('availableSeats')}
              placeholder="available seats"
            />
            {errors.availableSeats && (
              <p className="text-sm text-red-500">
                {errors.availableSeats.message}
              </p>
            )}
          </div>

          <label className="label">Category</label>
          <div>
            <select className="w-full border p-2" {...register('categoryId')}>
              <option value="" disabled selected>
                Select Category
              </option>
              <option value="1">Music</option>
              <option value="2">Holidays</option>
              <option value="3">Football</option>
              <option value="4">Seminar</option>
              <option value="5">Film</option>
              <option value="6">Automotive</option>
            </select>
            {errors.categoryId && (
              <p className="text-sm text-red-500">
                {errors.categoryId.message}
              </p>
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

export default FormEvents;
