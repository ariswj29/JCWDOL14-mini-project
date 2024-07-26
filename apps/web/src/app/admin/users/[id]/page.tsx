'use client';

import { createUserProcess, getUserById, updateUserProcess } from '@/api/user';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useRouter } from 'next/navigation';
import { ShowMessage } from '@/components/ShowMessage';
import { usersSchema } from '@/schema/schema';

const FormUsers = () => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(usersSchema),
  });

  const router = useRouter();
  const { id } = useParams();
  const userId = Array.isArray(id) ? id[0] : id || null;
  console.log(userId, 'userId');
  const [dataMessage, setDataMessage] = useState({
    message: '',
    status: '',
    data: {},
  });
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (userId != 'add') {
      getUserById(userId || '')
        .then((data) => {
          reset(data.data);
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        });
    }
  }, [userId, reset]);

  useEffect(() => {
    if (userId) {
      reset({ ...watch() });
    }
  }, [userId, reset, watch]);

  const formSubmit = async (formData: any) => {
    try {
      if (userId != 'add') {
        const response = await updateUserProcess(userId || '', formData);
        setShowMessage(true);
        setDataMessage(response);
      } else {
        const response = await createUserProcess(formData);
        setShowMessage(true);
        setDataMessage(response);
      }
      setTimeout(() => {
        setShowMessage(false);
        router.push('/admin/users');
      }, 3000);
    } catch (error) {
      console.error('Error creating/updating user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className="container mx-auto px-4">
        {showMessage === true ? (
          <ShowMessage
            name={
              dataMessage.message === 'User successfully created'
                ? 'Add Data Success'
                : dataMessage.message === 'User successfully updated'
                  ? 'Edit Data Success'
                  : 'Failed'
            }
            desc={dataMessage.message}
            status={dataMessage.status}
            show={showMessage}
          />
        ) : null}
        <div className="text-2xl mb-4">Table Users</div>
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="label">First Name</label>
          <div className="">
            <input
              className="w-full border p-2"
              {...register('firstName')}
              placeholder="First name"
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <label className="label">Last Name</label>
          <div className="">
            <input
              className="w-full border p-2"
              {...register('lastName')}
              placeholder="Last name"
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>

          <label className="label">Role</label>
          <div className="">
            <select className="w-full border p-2" {...register('roleId')}>
              <option value="" disabled selected>
                Select Role
              </option>
              <option value="1">Customer</option>
              <option value="2">Event Organizer</option>
            </select>
            {errors.roleId && (
              <p className="text-sm text-red-500">{errors.roleId.message}</p>
            )}
          </div>

          <label className="label">Email</label>
          <div className="">
            <input
              className="w-full border p-2"
              {...register('email')}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {userId == 'add' ? (
            <>
              <label className="label">Password</label>
              <div className="">
                <input
                  className="w-full border p-2"
                  type="password"
                  {...register('password')}
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </>
          ) : null}

          <label className="label">Address</label>
          <div className="">
            <input
              className="w-full border p-2"
              {...register('address')}
              placeholder="Address"
            />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>

          <label className="label">Phone Number</label>
          <div className="">
            <input
              className="w-full border p-2"
              type="number"
              {...register('phoneNumber')}
              placeholder="Phone Number"
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500">
                {errors.phoneNumber.message}
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

export default FormUsers;
