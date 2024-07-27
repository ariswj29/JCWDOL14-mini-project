'use client';
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDebounce } from 'use-debounce';

const SearchBar = (props: any) => {
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch] = useDebounce(search, 1000);

  useEffect(() => {
    props.setSearchEvents(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="container mx-auto px-12 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-full max-w-lg">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search events or location"
            className="py-2 px-4 rounded-l-md border border-secondary w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
