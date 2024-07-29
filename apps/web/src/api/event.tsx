// 'use server';
// import { cookies } from 'next/headers';
import { getCookie } from '@/actions/cookies';
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
  console.log('aaaaaaaaa');
  const authToken = await getCookie('token');
  const url = base_url_api + '/events/table';
  const config = {
    params: {
      search,
      page,
    },
    headers: {
      Authorization: 'Bearer ' + authToken,
    },
  };
  const res = await axios.get(url, config);

  return res.data;
}

export async function createEvents(data: any) {
  const authToken = await getCookie('token');
  const url = base_url_api + '/events';
  const res = await axios.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + authToken,
    },
  });

  return res.data;
}

export async function updateEvent(id: string, data: FormData) {
  const authToken = await getCookie('token');
  const url = base_url_api + '/events/' + id;
  const res = await axios.put(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + authToken,
    },
  });

  return res.data;
}

export async function deleteEvent(id: number) {
  const authToken = await getCookie('token');
  const url = base_url_api + '/events/' + id;

  const res = await axios.delete(url, {
    headers: {
      Authorization: 'Bearer ' + authToken,
    },
  });

  return res.data;
}
