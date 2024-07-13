import { useState } from 'react';
import { topUpProcess } from '@/api/profile';
import { ShowMessage } from '../ShowMessage';

export default function Topup(props: { profileId: number; setModal: any }) {
  const [saldo, setSaldo] = useState(0);
  const [dataMessage, setDataMessage] = useState({
    message: '',
    status: '',
    data: {},
  });
  const [showMessage, setShowMessage] = useState(false);

  const topUpSaldo = async () => {
    const data = {
      saldo: saldo,
    };
    try {
      const response = await topUpProcess(props.profileId, data);

      const { status } = response;

      setDataMessage(response);

      if (status === 'success') {
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
        <h3 className="text-xl font-bold">Top Up Saldo</h3>
        <p className="my-2">Top up your saldo here</p>
        <div className="grid my-4 gap-2 items-center text-center">
          <select
            className="p-2 mt-2 border border-secondary rounded-md shadow-sm w-full"
            value={saldo}
            onChange={(e) => setSaldo(Number(e.target.value))}
          >
            <option value="0" disabled selected>
              Select Amount
            </option>
            <option value="10000">Rp 10.000</option>
            <option value="20000">Rp 20.000</option>
            <option value="50000">Rp 50.000</option>
            <option value="100000">Rp 100.000</option>
            <option value="200000">Rp 200.000</option>
            <option value="500000">Rp 500.000</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2 items-center text-center">
          <a
            className="p-2 my-4 border bg-secondary rounded-md cursor-pointer hover:font-bold"
            onClick={topUpSaldo}
          >
            Confirm & Top Up
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
