'use client';

import { formattedDate, formattedMoney } from '@/helper/helper';
import { Event } from '@/interface/interface';
import Image from 'next/image';
import { useState } from 'react';
import { FaInfo } from 'react-icons/fa';

export default function Transactions({ transactions }: any) {
  const [detail, setDetail] = useState(false);
  const [detailData, setDetailData] = useState<{
    event?: Event;
    qn?: string;
    transaction?: any;
  }>({});
  const detailTransaction = (data: {}) => () => {
    setDetail(true);
    setDetailData(data);
  };

  return (
    <div id="transactions" className="p-8">
      {detail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <h1 className="text-lg font-bold">Detail Transaction</h1>
            <Image
              src={`http://localhost:8000/uploads/${detailData.event?.image}`}
              alt={detailData.event?.name || ''}
              className="h-60 object-cover rounded-md"
              width={500}
              height={500}
            />
            <p className="text-sm mt-2">
              Event:{' '}
              <span className="font-semibold">{detailData.event?.name}</span>
            </p>
            <p className="text-sm">
              Event Date :{' '}
              <span className="font-semibold">
                {' '}
                {formattedDate(detailData.event?.date || '')} :{' '}
                {detailData.event?.time}
              </span>
            </p>
            <p className="text-sm">
              Location :{' '}
              <span className="font-semibold">
                {' '}
                {detailData.event?.location}
              </span>
            </p>
            <p className="text-sm">
              Seat Number:{' '}
              <span className="font-semibold"> {detailData.qn}</span>
            </p>
            <hr className="my-2" />
            <p className="text-sm">
              Transaction Date :{' '}
              <span className="font-semibold">
                {' '}
                {formattedDate(detailData.transaction?.date)}
              </span>
            </p>
            <p className="text-sm">
              Price:{' '}
              <span className="font-semibold">
                {detailData.transaction?.price != detailData.event?.price ? (
                  <span className="text-red-500 line-through">
                    {formattedMoney(detailData.event?.price || 0)}
                  </span>
                ) : null}{' '}
                {formattedMoney(detailData.transaction?.price)}
              </span>
            </p>
            {detailData.transaction?.review.length > 0 ? (
              <div className="text-sm">
                <hr className="my-2" />
                <p className="text-sm">
                  Review :{' '}
                  <span className="font-semibold">
                    {detailData.transaction?.review.map(
                      (review: any) => review.rating,
                    )}
                  </span>
                </p>
                <p className="text-sm">
                  Comment :{' '}
                  <span className="font-semibold">
                    {detailData.transaction?.review.map(
                      (review: any) => review.comment,
                    )}
                  </span>
                </p>
              </div>
            ) : null}
            <button
              className="mt-4 p-2 border border-secondary rounded-md cursor-pointer hover:font-bold"
              onClick={() => setDetail(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <h3 className="text-2xl font-bold ">Your Transactions</h3>
      <p className="my-2">This is your transactions history.</p>

      <div className="grid grid-cols-1">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-1 border border-secondary">No</th>
              <th className="text-left p-1 border border-secondary">Event</th>
              <th className="text-left p-1 border border-secondary">SN</th>
              <th className="text-left p-1 border border-secondary">Date</th>
              <th className="text-left p-1 border border-secondary">Price</th>
              <th className="text-left p-1 border border-secondary">Detail</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-1 border border-secondary"
                >
                  Transaction not found
                </td>
              </tr>
            ) : (
              transactions.map((transaction: any, index: number) => (
                <tr key={index}>
                  <td className="text-left p-1 border border-secondary text-xs font-semibold">
                    {index + 1}
                  </td>
                  <td className="text-left p-1 border border-secondary text-xs font-semibold">
                    <div className="flex items-center">
                      <Image
                        src={`http://localhost:8000/uploads/${transaction.event.image}`}
                        alt={transaction.event.name}
                        className="w-28 rounded-md"
                        width={500}
                        height={500}
                      />
                      <span className="mx-2">{transaction.event.name}</span>
                    </div>
                  </td>
                  <td className="text-left p-1 border border-secondary text-xs font-semibold">
                    {transaction.qn}
                  </td>
                  <td className="text-left p-1 border border-secondary text-xs font-semibold">
                    {formattedDate(transaction.transaction.date)}
                  </td>
                  <td className="text-left p-1 border border-secondary text-xs font-semibold">
                    {formattedMoney(transaction.transaction.price)}
                  </td>
                  <td className="text-center p-1 border border-secondary text-xs font-semibold">
                    <a
                      className="rounded-md p-1 hover:cursor-pointer"
                      onClick={detailTransaction(transaction)}
                    >
                      <FaInfo
                        className="text-center hover:underline"
                        size={12}
                      />
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
