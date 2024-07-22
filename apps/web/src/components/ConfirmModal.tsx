import { useState } from 'react';
import { ShowMessage } from './ShowMessage';
import { deleteUserProcess } from '@/api/user';
import { deleteEvent } from '@/api/event';

export default function ConfirmModal(props: {
  id: number;
  setModal: any;
  title: string;
  for: string;
}) {
  const [dataMessage, setDataMessage] = useState({
    message: '',
    status: '',
    data: {},
  });
  const [showMessage, setShowMessage] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await deleteUserProcess(props.id);

      const { status } = response;

      setDataMessage(response);

      if (status == 'success') {
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const response = await deleteEvent(props.id);

      const { status } = response;

      setDataMessage(response);

      if (status == 'success') {
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
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
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className={`bg-white p-8 rounded-lg shadow-lg z-10 border-t-8`}>
        <h3 className="text-xl font-bold">Confirm {props.title}</h3>
        <p className="my-2">Are you sure to {props.title} this data?</p>
        <div className="grid grid-cols-2 gap-2 items-center text-center">
          <a
            className="p-2 my-4 border bg-secondary rounded-md cursor-pointer hover:font-bold"
            onClick={props.for == 'event' ? handleDeleteEvent : handleDelete}
          >
            Yes
          </a>
          <a
            className="p-2 border border-secondary rounded-md cursor-pointer hover:font-bold"
            onClick={() => props.setModal(false)}
          >
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
}
