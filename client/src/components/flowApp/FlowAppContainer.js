import React, { useState, useEffect } from 'react';
import FlowApp from './FlowApp';

// helper
import axiosInstance from 'helper/axiosInstance';

import { message } from 'antd';

const FlowAppContainer = () => {
  const [loading, setLoading] = useState(false);
  const [supportedApps, setSupportedApps] = useState([]);
  const [automationIds, setAutomationIds] = useState([]);

  const getSupportedApps = async () => {
    const result = await axiosInstance()
      .get('/puppeteer/saved/apis')
      .catch((error) => console.log(error));
    setSupportedApps(result.data);
  };

  useEffect(() => {
    getSupportedApps();
    fetchAutomations();
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
      const result = await axiosInstance().post(`/automation/create`, { data });
      setAutomationIds((oldState) => [...oldState, result.data._id]);
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

  //automation
  const fetchAutomations = () => {
    axiosInstance()
      .get('/automation/getAll')
      .then((res) => {
        console.log(res.data.map((a) => a._id));
        setAutomationIds(res.data.map((a) => a._id));
      })
      .catch((error) => console.log(error));
  };

  const handleStartTask = (id) => {
    const params = { id };
    axiosInstance()
      .get('/task/start', { params })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  const handleStopTask = (id) => {
    const params = { id };
    axiosInstance()
      .get('/task/stop', { params })
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
      automationIds={automationIds}
    />
  );
};

export default FlowAppContainer;
