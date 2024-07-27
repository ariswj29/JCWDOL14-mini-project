'use client';

import { checkReferralCodeProcess, registerProcess } from '@/api/auth';
import { ShowMessage } from '@/components/ShowMessage';
import { registerSchema } from '@/schema/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function RegisterPage() {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const router = useRouter();
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    roleId: '',
    email: '',
    password: '',
    usingReferralCode: '',
  });
  const [dataMessage, setDataMessage] = useState({
    message: '',
    status: '',
    data: {},
  });
  const [showMessage, setShowMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [referralCodeValid, setReferralCodeValid] = useState({
    message: '',
    status: '',
  });

  const formSubmit = async (formData: any) => {
    try {
      console.log(formData, 'formData');
      const response = await registerProcess({
        ...formData,
        usingReferralCode: data.usingReferralCode,
      });

      const { status, message } = response;

      setDataMessage(response);

      if (status === 'success') {
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);

          router.push('/login');
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkReferralCode = async () => {
    try {
      const response = await checkReferralCodeProcess(data);
      const { status, message } = response;
      setReferralCodeValid({ message, status });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="p-12 max-w-screen-xl mx-auto items-center">
      {showMessage && (
        <ShowMessage
          name={
            dataMessage.status === 'success'
              ? 'Register Success'
              : 'Register Failed'
          }
          desc={dataMessage.message}
          status={dataMessage.status}
          show={showMessage}
        />
      )}
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="grid md:grid-cols-3 sm:grid-cols-1">
          <div className="p-12 sm:p-16 bg-secondary border border-secondary shadow-sm w-full">
            <h3 className="text-2xl font-bold ">Welcome to Register</h3>
            <p className="my-2">
              Register your account and access for the features
            </p>
            <div className="my-4">
              <label
                htmlFor="referralCode"
                className="block text-sm font-medium"
              >
                Referral Code (Optional)
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  id="referralCode"
                  value={data.usingReferralCode}
                  onChange={(e) =>
                    setData({ ...data, usingReferralCode: e.target.value })
                  }
                  maxLength={8}
                  className="mt-1 block w-2/4 md:w-3/5 px-2 py-2 border border-secondary rounded-md shadow-sm focus:outline-none sm:text-sm"
                />
                <span
                  className="mt-1 px-2 py-3 text-xs hover:font-bold top-1/2 border border-primary rounded-md cursor-pointer transform"
                  onClick={() => checkReferralCode()}
                >
                  Check Code
                </span>
              </div>
              {referralCodeValid.message !== '' ? (
                <p
                  className={`my-2 text-sm font-semibold ${referralCodeValid.status === 'error' ? 'text-red-500' : 'text-green-500'}`}
                >
                  {referralCodeValid.message}
                </p>
              ) : null}
              <label
                htmlFor="refferalCode"
                className="mt-2 block text-xs font-medium"
              >
                If you have a referral code, please enter it here to get a
                discount coupon.
              </label>
            </div>
          </div>
          <div className="col-span-2 p-4 bg-primary shadow-md w-full">
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-secondary rounded-md shadow-sm focus:outline-none sm:text-sm"
                {...register('firstName')}
                type="text"
                id="firstName"
                placeholder="First name"
              />
              {errors.firstName && (
                <p className="text-xs text-red-500 m-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-secondary rounded-md shadow-sm focus:outline-none sm:text-sm"
                {...register('lastName')}
                type="text"
                id="lastName"
                placeholder="Last name"
              />
              {errors.lastName && (
                <p className="text-xs text-red-500 m-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="roleId" className="block text-sm font-medium">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                className="mt-1 block w-full px-3 py-2 border border-secondary rounded-md shadow-sm focus:outline-none sm:text-sm"
                {...register('roleId')}
              >
                <option value="" disabled selected>
                  Select Role
                </option>
                <option value="1">Customer</option>
                <option value="2">Event Organizer</option>
              </select>
              {errors.roleId && (
                <p className="text-xs text-red-500 m-1">
                  {errors.roleId.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-secondary rounded-md shadow-sm focus:outline-none sm:text-sm"
                {...register('email')}
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-xs text-red-500 m-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-sm font-medium">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="flex justify-between">
                <input
                  className="mt-1 block w-full px-3 py-2 border border-secondary rounded-md shadow-sm focus:outline-none sm:text-sm"
                  {...register('password')}
                  placeholder="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                />
                <span
                  className="absolute right-3 mt-1 top-1/2 cursor-pointer transform"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 m-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-3 bg-secondary rounded-md hover:font-bold"
            >
              Register
            </button>
            <hr className="my-4" />
            <Link
              href="/login"
              className="block w-full text-center py-2 px-3 bg-primary border border-secondary rounded-md hover:bg-secondary hover:font-bold"
            >
              Have an account? Login here
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}
