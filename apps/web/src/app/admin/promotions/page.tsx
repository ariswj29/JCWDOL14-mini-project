'use client';

import ConfirmModal from '@/components/ConfirmModal';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaPen, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { getAllPromotions } from '@/api/promotion';

interface Promotion {
  id: number;
  no: number;
  code: string;
  discount: number;
  eventId: number;
  userId: number;
  expireAt: string;
  event: {
    name: string;
  };
}

export default function EventTable() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(page);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [id, setId] = useState<number>(0);
  console.log(id, 'id');

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllPromotions(search, page);
      setPromotions(res.data);
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
      <div className="text-2xl mb-4">Table Promotions</div>
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
            href={'/admin/promotions/add'}
            className="bg-green-500 hover:bg-green-600 text-primary p-2 rounded"
          >
            <span className="flex items-center">
              <FaPlus /> &nbsp; Add Promotions
            </span>
          </Link>
        </div>
        <table className="table-auto">
          <thead className="bg-secondary">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Code</th>
              <th className="px-4 py-2">discount</th>
              <th className="px-4 py-2">Event</th>
              <th className="px-4 py-2">Expire Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-2 font-bold">Loading...</td>
              </tr>
            ) : promotions.length == 0 ? (
              <tr>
                <td className="p-2 font-bold">Data not found!</td>
              </tr>
            ) : (
              promotions.map((promotion: Promotion, index) => {
                const formattedDate = format(
                  new Date(promotion.expireAt),
                  'd MMMM yyyy',
                  {
                    locale: idLocale,
                  },
                );
                return (
                  <tr key={promotion.id} className="border p-2">
                    <td className="border p-2">{promotion.no}</td>
                    <td className="border p-2 capitalize">{promotion.code}</td>
                    <td className="border p-2 capitalize">
                      {promotion.discount}
                    </td>
                    <td className="border p-2 capitalize">
                      {promotion.event.name}
                    </td>
                    <td className="border p-2">{formattedDate}</td>
                    <td className="border p-2">
                      <Link href={`/admin/promotions/${promotion.id}`}>
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-primary p-1 rounded">
                          <FaPen />
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          setConfirmationModal(true);
                          setId(promotion.id);
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
        <ConfirmModal
          id={id}
          setModal={setConfirmationModal}
          title="Delete"
          for="promotion"
        />
      )}
    </div>
  );
}
