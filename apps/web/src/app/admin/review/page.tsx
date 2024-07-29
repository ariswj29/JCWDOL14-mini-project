'use client';

import { useEffect, useState } from 'react';
import { getAllReview } from '@/api/review';
import { Review } from '@/interface/interface';

export default function ReviewTable() {
  const [review, setReview] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(page);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllReview(page);
      setReview(res.data);
      setTotalPages(res.pagination.totalPages);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
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
      <div className="text-2xl mb-4">Table Review</div>
      <div className="grid gap-4">
        <table className="table-auto">
          <thead className="bg-secondary">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Rating</th>
              <th className="px-4 py-2">Comment</th>
              <th className="px-4 py-2">Event</th>
              <th className="px-4 py-2">User</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-2 font-bold">Loading...</td>
              </tr>
            ) : review.length === 0 ? (
              <tr>
                <td className="p-2 font-bold">Data not found!</td>
              </tr>
            ) : (
              review.map((review) => (
                <tr key={review.id} className="border p-2">
                  <td className="border p-2">{review.no}</td>
                  <td className="border p-2 capitalize">{review.rating}</td>
                  <td className="border p-2 capitalize">{review.comment}</td>
                  <td className="border p-2 capitalize">{review.event.name}</td>
                  <td className="border p-2">
                    {review.user.firstName} {review.user.lastName}
                  </td>
                </tr>
              ))
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
    </div>
  );
}
