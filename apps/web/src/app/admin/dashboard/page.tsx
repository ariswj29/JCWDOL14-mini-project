'use client';

import { FaMoneyBill, FaTicketAlt, FaUsers } from 'react-icons/fa';
import ChartBar from '@/components/ChartBar';
import ChartLine from '@/components/ChartLine';

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-2xl mb-4">Dashboard</div>
      <div className="grid grid-cols-3 gap-4 items-center justify-center">
        <div className="p-8 border border-secondary rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaUsers className="text-4xl" />
              <div className="text-md ml-2">Total Users</div>
            </div>
            <div className="text-xl font-bold">100</div>
          </div>
        </div>
        <div className="p-8 border border-secondary rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaMoneyBill className="text-4xl" />
              <div className="text-md ml-2">Total Transactions</div>
            </div>
            <div className="text-xl font-bold">100</div>
          </div>
        </div>
        <div className="p-8 border border-secondary rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaTicketAlt className="text-4xl" />
              <div className="text-md ml-2">Total Events</div>
            </div>
            <div className="text-xl font-bold">100</div>
          </div>
        </div>
        <div className="p-8 border border-secondary rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaTicketAlt className="text-4xl text-green-400" />
              <div className="text-md ml-2">Events for this year</div>
            </div>
            <div className="text-xl font-bold">100</div>
          </div>
        </div>
        <div className="p-8 border border-secondary rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaTicketAlt className="text-4xl text-blue-400" />
              <div className="text-md ml-2">Events for this month</div>
            </div>
            <div className="text-xl font-bold">100</div>
          </div>
        </div>
        <div className="p-8 border border-secondary rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaTicketAlt className="text-4xl text-yellow-400" />
              <div className="text-md ml-2">Events for today</div>
            </div>
            <div className="text-xl font-bold">100</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="p-8 border border-secondary rounded-lg">
          <ChartBar />
        </div>
        <div className="p-8 border border-secondary rounded-lg">
          <ChartLine />
        </div>
      </div>
    </div>
  );
}
