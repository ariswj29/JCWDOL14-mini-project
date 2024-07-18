import axios from 'axios';

const base_url_api = 'http://localhost:8000/api';

export const getDashboardData = async () => {
  try {
    const response = await axios.get(base_url_api + '/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data', error);
  }
};
