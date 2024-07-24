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
export async function getEvent(id: string) {
  const url = base_url_api + '/events/' + id;
  const res = await axios.get(url);

  return res.data;
}

export async function getAllTableEvents(search: string, page: number) {
  const url = base_url_api + '/events/table';
  const config = {
    params: {
      search,
      page,
    },
  };
  const res = await axios.get(url, config);

  return res.data;
}

export async function createEvents(data: any) {
  const url = base_url_api + '/events';
  const res = await axios.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
}

export async function updateEvent(id: string, data: FormData) {
  const url = base_url_api + '/events/' + id;
  const res = await axios.put(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
}

export async function deleteEvent(id: number) {
  const url = base_url_api + '/events/' + id;
  const res = await axios.delete(url);

  return res.data;
}
