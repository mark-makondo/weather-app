import axios from 'axios';

// config
import settings from '../settings';

const {
  backend: { URI },
  weather: { BASE_URI, API_KEY },
} = settings;

const axiosInstance = (history = null) => {
  // let baseURL = `${URI}/puppeteer`;
  let baseURL = `${URI}`;
  const headers = {};

  const axiosInstance = axios.create({
    baseURL,
    headers,
    // params: {
    //   appid: API_KEY,
    // },
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
