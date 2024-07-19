'use client';

import { getAllTableEvents } from '@/api/event';
import ConfirmModal from '@/components/ConfirmModal';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaPen, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import Image from 'next/image';

interface Event {
  id: number;
  no: number;
  image: string;
  name: string;
  categoryId: number;
  date: string;
  price: number | null;
}

export default function EventTable() {
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(page);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllTableEvents(search, page);
      setEvents(res.data);
      setTotalPages(res.pagination.totalPages);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    fetchData();
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="text-2xl mb-4">Table Events</div>
      <div className="grid gap-4">
        <div className="flex justify-between items-center gap-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Search event"
              className="border p-2"
              value={search}
              onChange={handleSearchChange}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white  py-2 px-4 rounded"
              onClick={handleSearchClick}
            >
              <FaSearch />
            </button>
          </div>
          <Link
            href={'/admin/users/add'}
            className="bg-green-500 hover:bg-green-600 text-primary p-2 rounded"
          >
            <span className="flex items-center">
              <FaPlus /> &nbsp; Add Event
            </span>
          </Link>
        </div>
        <table className="table-auto">
          <thead className="bg-secondary">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-2 font-bold">Loading...</td>
              </tr>
            ) : events.length == 0 ? (
              <tr>
                <td className="p-2 font-bold">Data not found!</td>
              </tr>
            ) : (
              events.map((event: Event, index) => {
                const formattedDate = format(
                  new Date(event.date),
                  'd MMMM yyyy',
                  {
                    locale: idLocale,
                  },
                );
                return (
                  <tr key={event.id} className="border p-2">
                    <td className="border p-2">{event.no}</td>
                    <td className="border p-2">
                      <Image
                        src={`http://localhost:8000/uploads/${event.image}`}
                        alt={event.name}
                        width={100}
                        height={200}
                      />
                    </td>
                    <td className="border p-2">{event.name}</td>
                    <td className="border p-2">{event.categoryId}</td>
                    <td className="border p-2">{formattedDate}</td>
                    <td className="border p-2">
                      {event.price !== null ? `Rp.${event.price}` : 'free'}
                    </td>
                    <td className="border p-2">
                      <Link href={`/admin/events/${event.id}`}>
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-primary p-1 rounded">
                          <FaPen />
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          setConfirmationModal(true);
                          setId(event.id);
                        }}
                        className="bg-red-500 hover:bg-red-600 text-primary p-1 rounded ml-2"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center gap-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:bg-slate-500"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Prev
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ml-2 disabled:bg-slate-500"
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      {confirmationModal && (
        <ConfirmModal id={id} setModal={setConfirmationModal} title="Delete" />
      )}
    </div>
  );
}
