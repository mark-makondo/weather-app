import React, { useState } from 'react';
import axios from 'axios';

// ui
import GeoLocator from './GeoLocator';

const GeoLocatorContainer = ({ setTriggerData }) => {
  const [loading, setLoading] = useState(false);

  const [ipAddress, setIpAddress] = useState('');
  const [result, setResult] = useState(null);

  const onInputChange = (e) => {
    const value = e.target.value;
    setIpAddress(value);
  };

  const onFetch = async () => {
    await fetchIPAddress();
  };

  const fetchIPAddress = async () => {
    try {
      setLoading(true);

      const API_WHOIS_BASE_URL = 'http://ipwhois.app/json';

      const result = await axios.get(`${API_WHOIS_BASE_URL}/${ipAddress}`);

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
    } catch (error) {
      console.error(error);
      setLoading(false);
    }

    setLoading(false);
  };

  return <GeoLocator onInputChange={onInputChange} ipAddress={ipAddress} onFetch={onFetch} loading={loading} />;
};

export default GeoLocatorContainer;
