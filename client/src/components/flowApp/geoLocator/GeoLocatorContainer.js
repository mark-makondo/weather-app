import React, { useState } from 'react';
import axios from 'axios';

// ui
import GeoLocator from './GeoLocator';

const GeoLocatorContainer = ({ setTriggerData, formReference }) => {
  const [loading, setLoading] = useState(false);

  // const [ipAddress, setIpAddress] = useState('');
  const [result, setResult] = useState(null);

  // const onInputChange = (e) => {
  //   const value = e.target.value;
  //   console.log('value ip', value, e);
  //   setIpAddress(value);
  // };

  const onFetch = async () => {
    await fetchIPAddress();
  };

  const fetchIPAddress = async () => {
    try {
      let ipAddress = formReference.getFieldValue('parameters');
      console.log('fetchg ip', ipAddress);
      setLoading(true);

      // 104.236.215.216
      const API_WHOIS_BASE_URL = 'http://ipwhois.app/json';

      const result = await axios.get(`${API_WHOIS_BASE_URL}/${ipAddress}`);
      console.log(result);
      setLoading(false);

      if (!result.data) return;

      const { city, latitude, longitude } = result.data;

      // cant find city id and zip code

      const formatData = {
        city,
        latitude,
        longitude,
      };

      // use this to pass data from trigger to action
      setTriggerData(formatData);

      // use this to preview data
      setResult(formatData);

      // console.log(formatData);
      // console.log(result.data);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }

    setLoading(false);
  };

  return <GeoLocator onFetch={onFetch} loading={loading} result={result} formReference={formReference} />;
};

export default GeoLocatorContainer;
