// 'use server';
// import { cookies } from 'next/headers';
import axios from 'axios';

const base_url_api = 'http://localhost:8000/api';

export async function getAllEvents(data: {}) {
  const url = base_url_api + '/events';
  const res = await axios.get(url, data);

  return res.data;
}
export async function getEvent(id: Number) {
  const url = base_url_api + '/events/' + id;
  console.log(url, 'url');
  const res = await axios.get(url);

  return res.data;
}

export async function getSearchEvents(search: string) {
  const url = base_url_api + '/events';
  const res = await axios.get(url, {
    params: {
      search: search,
    },
  });
  return res.data;
}

export async function getPagination(page: number, limit: number = 4) {
  const url = `${base_url_api}/events`;
  const res = await axios.get(url, {
    params: {
      page,
      limit,
    },
  });
  return res.data;
}
