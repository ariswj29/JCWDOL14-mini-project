'use client';

import { FaMoneyBill, FaTicketAlt, FaUsers } from 'react-icons/fa';
import ChartBar from '@/components/ChartBar';
import ChartLine from '@/components/ChartLine';
import { useEffect, useState } from 'react';
import { getDashboardData } from '@/api/dashboard';

export default function DashboardPage() {
  const [data, setData] = useState({
    users: 0,
    transactions: 0,
    events: 0,
    eventsThisYear: 0,
    eventsThisMonth: 0,
    eventsToday: 0,
    arrayCountCategories: [],
    arrayCountAttandeePerMonth: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboardData();
        setData(response);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };
    fetchData();
  }, []);

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
            <div className="text-xl font-bold">{data.users}</div>
          </div>
        </div>
        <div className="p-8 border border-secondary rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaMoneyBill className="text-4xl" />
              <div className="text-md ml-2">Total Transactions</div>
            </div>
            <div className="text-xl font-bold">{data.transactions}</div>
          </div>
        </div>
        <div className="p-8 border border-secondary rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaTicketAlt className="text-4xl" />
              <div className="text-md ml-2">Total Events</div>
            </div>
            <div className="text-xl font-bold">{data.events}</div>
          </div>
        </div>
        <div className="p-8 border border-secondary rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaTicketAlt className="text-4xl text-green-400" />
              <div className="text-md ml-2">Events for this year</div>
            </div>
            <div className="text-xl font-bold">{data.eventsThisYear}</div>
          </div>
        </div>
        <div className="p-8 border border-secondary rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaTicketAlt className="text-4xl text-blue-400" />
              <div className="text-md ml-2">Events for this month</div>
            </div>
            <div className="text-xl font-bold">{data.eventsThisMonth}</div>
          </div>
        </div>
        <div className="p-8 border border-secondary rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaTicketAlt className="text-4xl text-yellow-400" />
              <div className="text-md ml-2">Events for today</div>
            </div>
            <div className="text-xl font-bold">{data.eventsToday}</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="p-8 border border-secondary rounded-lg">
          <ChartBar data={data.arrayCountCategories} />
        </div>
        <div className="p-8 border border-secondary rounded-lg">
          <ChartLine data={data.arrayCountAttandeePerMonth} />
        </div>
      </div>
    </div>
  );
}
