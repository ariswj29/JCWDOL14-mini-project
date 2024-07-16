'use client';

import { getUsersProcess } from '@/api/user';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaPen, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';

export default function UsersPage() {
  interface User {
    id: number;
    no: number;
    firstName: string;
    lastName: string;
    email: string;
    roleId: number;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(page);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getUsersProcess(search, page);
      setUsers(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
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
      <div className="text-2xl mb-4">Table Users</div>
      <div className="grid gap-4">
        <div className="flex justify-between items-center gap-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Search name user"
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
            href={'/add'}
            className="bg-green-500 hover:bg-green-600 text-primary p-2 rounded"
          >
            <span className="flex items-center">
              <FaPlus /> &nbsp; Add User
            </span>
          </Link>
        </div>
        <table className="table-auto">
          <thead className="bg-secondary">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-2 font-bold">Loading...</td>
              </tr>
            ) : users.length == 0 ? (
              <tr>
                <td className="p-2 font-bold">Data not found!</td>
              </tr>
            ) : (
              users.map((user: User, index) => (
                <tr key={user.id} className="border p-2">
                  <td className="border p-2">{user.no}</td>
                  <td className="border p-2">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">
                    {user.roleId == 1 ? 'Event Organizer' : 'Customer'}
                  </td>
                  <td className="border p-2">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-primary p-1 rounded">
                      <FaPen />
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-primary p-1 rounded ml-2">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
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
