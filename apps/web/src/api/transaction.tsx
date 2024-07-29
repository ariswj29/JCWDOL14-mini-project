import axios from '../utils/axiosConfig';

const base_url_api = 'http://localhost:8000/api';

export async function buyTransactionProcess(data: any) {
  const url = base_url_api + '/transactions/buy-ticket';
  const res = await axios.post(url, data);

  return res.data;
}

export async function getTransaction(id: number) {
  const url = base_url_api + `/transactions/${id}`;
  const res = await axios.get(url);

  return res.data;
}

export async function getAllTransactions(page: number) {
  const url = base_url_api + '/transactions';
  const config = {
    params: {
      page,
    },
  };
  const res = await axios.get(url, config);

  return res.data;
}
