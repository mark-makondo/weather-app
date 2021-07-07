import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

// ui
import Weather from './Weather';

// helper
import axiosInstance from 'helper/axiosInstance';

// settings
import settings from '../../settings';

const {
  weather: { API_KEY, BASE_URI },
} = settings;

const WeatherContainer = () => {
  const [loading, setLoading] = useState(false);

  const scrapeApiDoc = async (api) => {
    try {
      setLoading(true);

      await axiosInstance().get(`/puppeteer/scrape/api/docs?name=${api}`);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const onOpenWeatherScrape = async () => {
    const api = 'openWeather';

    // console.log('clicked');
    await scrapeApiDoc(api).catch((err) => console.error(err));
  };

  return <Weather loading={loading} onOpenWeatherScrape={onOpenWeatherScrape} />;
};

export default WeatherContainer;
