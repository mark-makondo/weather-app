import React, { useState, useEffect } from 'react';
import FlowApp from './FlowApp';

// helper
import axiosInstance from 'helper/axiosInstance';

import { message } from 'antd';

const FlowAppContainer = () => {
  const [loading, setLoading] = useState(false);
  const [supportedApps, setSupportedApps] = useState([]);

  const getSupportedApps = async () => {
    const result = await axiosInstance()
      .get('/puppeteer/saved/apis')
      .catch((error) => console.log(error));
    setSupportedApps(result.data);
  };

  useEffect(() => {
    getSupportedApps();
  }, []);

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

  const saveAutomation = async (data) => {
    try {
      setLoading(true);
      await axiosInstance().post(`/automation/create`, { data });
      message.success('automation successfully saved.');
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

  const handleStartTask = () => {
    axiosInstance()
      .get('/task/start')
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };
  const handleStopTask = () => {
    axiosInstance()
      .get('/task/stop')
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  return (
    <FlowApp
      onOpenWeatherScrape={onOpenWeatherScrape}
      loading={loading}
      supportedApps={supportedApps}
      saveAutomation={saveAutomation}
      handleStartTask={handleStartTask}
      handleStopTask={handleStopTask}
    />
  );
};

export default FlowAppContainer;
