// 'use server';
// import { cookies } from 'next/headers';
import axios from 'axios';

const base_url_api = 'http://localhost:8000/api';

export async function getAllEvents(
  search?: string,
  category?: string,
  sort?: string,
  page: number = 1,
  limit: number = 4,
) {
  const url = base_url_api + '/events';
  const res = await axios.get(url, {
    params: {
      search,
      category,
      sort,
      page,
      limit,
    },
  });

  return res.data;
}
export async function getEvent(id: Number) {
  const url = base_url_api + '/events/' + id;
  const res = await axios.get(url);

  return res.data;
}
