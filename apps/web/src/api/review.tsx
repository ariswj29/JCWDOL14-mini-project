import axios from 'axios';

const base_url_api = 'http://localhost:8000/api';

export async function getAllReview(page: number) {
  const url = base_url_api + '/review';
  const config = {
    params: {
      page,
    },
  };
  const res = await axios.get(url, config);

  return res.data;
}

export async function createReview(data: any) {
  const url = base_url_api + '/review';
  const res = await axios.post(url, data);

  return res.data;
}
