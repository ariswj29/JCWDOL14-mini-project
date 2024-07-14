import { editProfileProcess } from '@/api/profile';
import { ShowMessage } from '../ShowMessage';
import { useState } from 'react';

export default function EditProfile(props: {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
  };
  setProfile: (arg0: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
  }) => void;
}) {
  const [dataMessage, setDataMessage] = useState({
    message: '',
    status: '',
    data: {},
  });
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = localStorage.getItem('user');
    const { profileId } = JSON.parse(user as string);
    try {
      const response = await editProfileProcess(profileId, props.profile);

      const { status } = response;

      setDataMessage(response);

      if (status === 'success') {
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="edit-profile" className="p-8">
      {showMessage === true ? (
        <ShowMessage
          name={
            dataMessage.status === 'success'
              ? 'Updated Success'
              : 'Updated Failed'
          }
          desc={dataMessage.message}
          status={dataMessage.status}
          show={showMessage}
        />
      ) : null}
      <h3 className="text-2xl font-bold ">Edit Profile</h3>
      <p className="my-2">Edit your profile here</p>

      <form
        className="grid md:grid-cols-2 gap-2 items-center"
        onSubmit={handleSubmit}
      >
        <div className="col-span-2 md:col-span-1 py-1">
          <label htmlFor="name" className="block text-sm font-medium">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={props.profile?.firstName}
            onChange={(e) =>
              props.setProfile({ ...props.profile, firstName: e.target.value })
            }
            required
            className="mt-1 block w-full px-3 py-2 border border-secondary rounded-md shadow-sm focus:outline-none sm:text-sm"
          />
        </div>
        <div className="col-span-2 md:col-span-1 py-1">
          <label htmlFor="name" className="block text-sm font-medium">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={props.profile?.lastName}
            onChange={(e) =>
              props.setProfile({ ...props.profile, lastName: e.target.value })
            }
            required
            className="mt-1 block w-full px-3 py-2 border border-secondary rounded-md shadow-sm focus:outline-none sm:text-sm"
          />
        </div>
        <div className="col-span-2 md:col-span-1 py-1">
          <label htmlFor="name" className="block text-sm font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="name"
            value={props.profile?.email}
            required
            disabled
            className="mt-1 block w-full px-3 py-2 border bg-slate-100 border-secondary rounded-md shadow-sm sm:text-sm"
          />
        </div>
        <div className="col-span-2 md:col-span-1 py-1">
          <label htmlFor="phoneNumber" className="block text-sm font-medium">
            Phone Number
          </label>
          <input
            type="number"
            maxLength={15}
            id="phoneNumber"
            value={props.profile?.phoneNumber}
            onChange={(e) =>
              props.setProfile({
                ...props.profile,
                phoneNumber: e.target.value,
              })
            }
            required
            className="mt-1 block w-full px-3 py-2 border border-secondary rounded-md shadow-sm focus:outline-none sm:text-sm"
          />
        </div>
        <div className="col-span-2 py-1">
          <label htmlFor="name" className="block text-sm font-medium">
            Address
          </label>
          <input
            type="text"
            id="name"
            value={props.profile?.address}
            onChange={(e) =>
              props.setProfile({ ...props.profile, address: e.target.value })
            }
            required
            className="mt-1 block w-full px-3 py-2 border border-secondary rounded-md shadow-sm focus:outline-none sm:text-sm"
          />
        </div>

        <button className="col-span-2 p-2 mt-4 bg-secondary rounded-md hover:font-bold cursor-pointer">
          Save Changes
        </button>
      </form>
    </div>
  );
}
