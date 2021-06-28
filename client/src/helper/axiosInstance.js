import axios from 'axios';

// config
import { weather } from 'settings';

const { BASE_URI, API_KEY } = weather;

const axiosInstance = (history = null) => {
  const headers = {};

  const axiosInstance = axios.create({
    baseURL: BASE_URI,
    headers,
    params: {
      appid: API_KEY,
    },
  });

  axiosInstance.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    (error) => {
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      if (error.response.status === 401 || error.response.status === 500) {
        if (history) {
          history.push('/');
        }
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  );

  return axiosInstance;
};

export default axiosInstance;
