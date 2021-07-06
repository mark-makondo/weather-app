import React, { useState } from 'react';
import FlowApp from './FlowApp';

// helper
import axiosInstance from 'helper/axiosInstance';

const FlowAppContainer = () => {
  const [loading, setLoading] = useState(false);

  const scrapeApiDoc = async (api) => {
    try {
      setLoading(true);

      await axiosInstance().get(`/scrape/api/docs?name=${api}`);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const onOpenWeatherScrape = async () => {
    const api = 'openWeather';

    console.log('clicked');
    await scrapeApiDoc(api).catch((err) => console.error(err));
  };

  return <FlowApp onOpenWeatherScrape={onOpenWeatherScrape} loading={loading} />;
};

export default FlowAppContainer;
