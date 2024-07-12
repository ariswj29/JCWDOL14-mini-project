export default function Topup({ setModal }: { setModal: any }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className={`bg-white p-8 rounded-lg shadow-lg z-10 border-t-8`}>
        <h3 className="text-xl font-bold">Top Up Saldo</h3>
        <p className="my-2">Top up your saldo here</p>
        <div className="grid my-4 gap-2 items-center text-center">
          <select className="p-2 mt-2 border border-secondary rounded-md shadow-sm w-full">
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
            // onClick={() => setShowMessage(false)}
          >
            Confirm & Top Up
          </a>
          <a
            className="p-2 border border-secondary rounded-md cursor-pointer hover:font-bold"
            onClick={() => {
              setModal(false);
              console.log('setModal', setModal);
            }}
          >
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
}
