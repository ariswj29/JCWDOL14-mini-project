import axios from 'axios';

const base_url_api = 'http://localhost:8000/api';

export async function getProfileProcess(id: number) {
  const url = base_url_api + '/profile/' + id;
  const res = await axios.get(url);

  return res.data;
}

export async function editProfileProcess(id: number, data: any) {
  const url = base_url_api + '/profile/' + id;
  const res = await axios.put(url, data);

  return res.data;
}

export async function topUpProcess(id: number, data: any) {
  const url = base_url_api + '/profile/top-up/' + id;
  const res = await axios.put(url, data);

  return res.data;
}
