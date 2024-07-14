// 'use server';
// import { cookies } from 'next/headers';
import axios from 'axios';

const base_url_api = 'http://localhost:8000/api';

export async function getAllEvents(data: any) {
  const url = base_url_api + '/events';
  const res = await axios.get(url, data);

  return res.data;
}
