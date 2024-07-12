'use client';

import { useState } from 'react';
import Topup from './TopUp';

export default function Points(props: any) {
  const [topUpModal, setTopUpModal] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(props.referralCode)
      .then(() => {
        alert('Referral code copied to clipboard');
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
      });
  };

  return (
    <div id="points" className="p-8">
      <h3 className="text-2xl font-bold ">Saldo, Points & Discounts</h3>
      <p className="my-2">
        Check your referral code, saldo, points & discounts here
      </p>
      <p className="my-2">
        Your referral code is{' '}
        <span
          className="p-1 font-bold cursor-pointer hover:underline border border-secondary rounded-md"
          onClick={copyToClipboard}
        >
          {props.referralCode}
        </span>
        {'. '}Click to copy
      </p>

      <div className="grid md:grid-cols-3 gap-2 items-center text-center">
        <div className="col-span-3 md:col-span-1 p-4 border border-secondary rounded-md shadow-sm">
          <h4 className="text-xl font-bold">Saldo</h4>
          <p className="text-2xl font-bold">
            {props.saldo === 0 ? 0 : props.saldo}
          </p>
        </div>
        <div className="col-span-3 md:col-span-1 p-4 border border-secondary rounded-md shadow-sm">
          <h4 className="text-xl font-bold">Points</h4>
          <p className="text-2xl font-bold">
            {props.points === 0 ? 0 : props.points}
          </p>
        </div>
        <div className="col-span-3 md:col-span-1 p-4 border border-secondary rounded-md shadow-sm">
          <h4 className="text-xl font-bold">Discounts</h4>
          <p className="text-2xl font-bold">
            {props.discounts === 0 ? 0 : props.discounts} %
          </p>
        </div>

        <a
          className="col-span-3 p-2 mt-4 bg-secondary rounded-md hover:font-bold cursor-pointer"
          onClick={() => setTopUpModal(true)}
        >
          Top Up Saldo
        </a>
        {topUpModal === true ? <Topup setModal={setTopUpModal} /> : null}
      </div>
    </div>
  );
}
