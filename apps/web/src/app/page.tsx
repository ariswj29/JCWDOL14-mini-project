'use client';
import Category from '@/components/homeSection/Category';
import EventList from '@/components/homeSection/EventList';
import SearchBar from '@/components/homeSection/SearchBar';
import SortButtons from '@/components/homeSection/SortButtons';
import React, { useState } from 'react';

const Home: React.FC = () => {
  const handleSortChange = (sortConfig: { key: string; direction: string }) => {
    console.log(`Sort by ${sortConfig.key} in ${sortConfig.direction} order`);
    // Implement sorting logic here
    // const handleSearch = (query: string) => {
    //   // Tambahkan logika untuk mencari data berdasarkan `query`
    //   console.log(`Search query: ${query}`);
    // };
  };

  return (
    <main>
      <Category />
      <div className="container mx-auto mt-8 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4  space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto h-full">
          <SearchBar />
          <div className="w-full md:w-auto h-full">
            <SortButtons onSortChange={handleSortChange} />
          </div>
        </div>
      </div>
      <EventList />
    </main>
  );
};
export default Home;
