import axios from '../utils/axiosConfig';

const base_url_api = 'http://localhost:8000/api';

export async function getUsersProcess(search: string, page: number) {
  const url = base_url_api + '/users';
  const config = {
    params: {
      search,
      page,
    },
  };
  const res = await axios.get(url, config);

  return res.data;
}

export async function createUserProcess(data: any) {
  const url = base_url_api + '/users';
  const res = await axios.post(url, data);

  return res.data;
}

export async function getUserById(id: string) {
  const url = base_url_api + '/users/' + id;
  const res = await axios.get(url);

  return res.data;
}

export async function updateUserProcess(id: string, data: any) {
  const url = base_url_api + '/users/' + id;
  const res = await axios.put(url, data);

  return res.data;
}

export async function deleteUserProcess(id: number) {
  const url = base_url_api + '/users/' + id;
  const res = await axios.delete(url);

  return res.data;
}
