// 'use server';
// import { cookies } from 'next/headers';
import axios from 'axios';
import Cookies from 'js-cookie';

const base_url_api = 'http://localhost:8000/api';

export async function registerProcess(data: any) {
  const url = base_url_api + '/auth/register';
  const res = await axios.post(url, data);

  return res.data;
}

export async function loginProcess(data: any) {
  const url = base_url_api + '/auth/login';
  const res = await axios.post(url, data);

  return res.data;
}

export async function checkReferralCodeProcess(data: any) {
  const url = base_url_api + '/auth/check-referral-code';
  const res = await axios.post(url, data);

  return res.data;
}

export async function logoutProcess() {
  Cookies.remove('token');
  Cookies.remove('role');
  localStorage.removeItem('user');
}
