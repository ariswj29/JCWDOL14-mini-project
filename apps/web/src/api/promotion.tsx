import axios from '../utils/axiosConfig';

const base_url_api = 'http://localhost:8000/api';

export async function getPromotion(id: string) {
  const url = base_url_api + '/promotions/' + id;
  const res = await axios.get(url);

  return res.data;
}

export async function getAllPromotions(search: string, page: number) {
  const url = base_url_api + '/promotions';
  const config = {
    params: {
      search,
      page,
    },
  };
  const res = await axios.get(url, config);

  return res.data;
}

export async function createPromotion(data: any) {
  const url = base_url_api + '/promotions';
  const res = await axios.post(url, data);

  return res.data;
}

export async function updatePromotion(id: string, data: any) {
  const url = base_url_api + '/promotions/' + id;
  const res = await axios.put(url, data);

  return res.data;
}

export async function deletePromotion(id: number) {
  const url = base_url_api + '/promotions/' + id;
  const res = await axios.delete(url);

  return res.data;
}
export async function selectEvent() {
  const url = base_url_api + '/promotions/select-event';
  const res = await axios.get(url);

  return res.data;
}
