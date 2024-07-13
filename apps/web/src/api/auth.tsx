// 'use server';
// import { cookies } from 'next/headers';
import axios from 'axios';

const base_url_api = 'http://localhost:8000/api';

export async function registerProcess(data: any) {
  const url = base_url_api + '/users/register';
  const res = await axios.post(url, data);

  return res.data;
}

export async function loginProcess(data: any) {
  const url = base_url_api + '/users/login';
  const res = await axios.post(url, data);

  return res.data;
}

export async function checkReferralCodeProcess(data: any) {
  const url = base_url_api + '/users/check-referral-code';
  const res = await axios.post(url, data);

  return res.data;
}

export async function logoutProcess() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('role');
}
