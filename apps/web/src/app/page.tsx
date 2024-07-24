'use client';
import Category from '@/components/homeSection/Category';
import EventList from '@/components/homeSection/EventList';
import SearchBar from '@/components/homeSection/SearchBar';
import SortButtons from '@/components/homeSection/SortButtons';
import React, { useState } from 'react';

const Home: React.FC = () => {
  const [searchEvents, setSearchEvents] = useState('');
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');

  const handleSortChange = (sortConfig: string) => {
    setSort(sortConfig);
  };
  const handleSortCategory = (sortConfig: string) => {
    setCategory(sortConfig);
  };

  return (
    <main className="max-w-screen-xl mx-auto items-center">
      <Category onSortChange={handleSortCategory} />
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto h-full">
          <SearchBar setSearchEvents={setSearchEvents} />
          <div className="w-full h-full md:w-auto text-center">
            <span className="text-sm font-semibold">Sort by:</span>
            <SortButtons onSortChange={handleSortChange} />
          </div>
        </div>
      </div>
      <div>
        <EventList
          category={category}
          searchEvents={searchEvents}
          sort={sort}
        />
      </div>
    </main>
  );
};
export default Home;
