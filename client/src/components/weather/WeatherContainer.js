import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

// ui
import Weather from './Weather';

// helper
import axiosInstance from 'helper/axiosInstance';

// settings
import settings from '../../settings';

// antd
import message from 'antd/lib/message';

const {
  weather: { API_KEY, BASE_URI },
} = settings;

const WeatherContainer = () => {
  const [openWeatherMethods, setOpenWeatherMethods] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('By city name');
  const [params, setParams] = useState({
    required: [],
    optional: [],
  });

  const getScrapedData = useCallback(async () => {
    try {
      if (openWeatherMethods) return;

      setLoading(true);

      const res = await axiosInstance().get('/scrape/open-weather/docs/api');

      !!res && setOpenWeatherMethods(res.data);

      setLoading(false);

      console.log('RETURNED API METHODS', res.data);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [openWeatherMethods]);

  useEffect(() => {
    getScrapedData();
    return () => getScrapedData();
  }, [getScrapedData]);

  useEffect(() => {
    if (!openWeatherMethods) return;

    const requiredParams = [];
    const optionalParams = [];

    const holder = [...openWeatherMethods];

    const filteredValue = holder.filter((data) => data.title === selected);

    filteredValue[0].params.forEach((param) => {
      if (!param.includes('\t')) return;

      const split = param.split('\t');

      if (split.includes('required')) requiredParams.push(split);
      else optionalParams.push(split);
    });

    setParams({
      required: [...requiredParams],
      optional: [...optionalParams],
    });

    console.log('SELECTED API', filteredValue);
    console.log('REQUIRED PARAMS', requiredParams);
    console.log('OPTIONAL PARAMS', optionalParams);
  }, [selected, openWeatherMethods]);

  //#region BUTTONS
  const onSelect = (value) => {
    console.log(value);
    setSelected(value);
  };

  const onSearch = async (value) => {
    let combined = '';

    params.required.forEach((param) => {
      if (param[0] === 'appid') combined += `${param[0]}=${API_KEY}`;
      else combined += `${param[0]}=${value}&`;
    });

    const res = await axios.get(`${BASE_URI}/?${combined}`).catch((err) => console.error(err));

    console.log(res.data);
    alert(res.data.coord);
  };

  //#endregion

  return (
    <Weather
      onSelect={onSelect}
      openWeatherMethods={openWeatherMethods}
      loading={loading}
      onSearch={onSearch}
      selected={selected}
    />
  );
};

export default WeatherContainer;
