// 'use server';
// import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import axios from 'axios';

const base_url_api = 'http://localhost:8000/api';

export async function registerProcess(data: any) {
  const url = base_url_api + '/users/register';
  const res = await axios.post(url, data);
  console.log('res', res);

  return res;
}
