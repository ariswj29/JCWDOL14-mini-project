import axios from 'axios';

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

  return res;
}
