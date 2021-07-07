import React, { useEffect, useState } from 'react';

//helper
import { capitalize } from 'helper/functions';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

const { Item } = Form;
const { Search } = Input;
const GeoLocator = ({ onInputChange, onFetch, loading, result, formReference }) => {
  // const [ipAddr, setIpAddr] = useState('');

  const getCurrentIPAddress = () => {
    const url = 'https://api.ipify.org/?format=json';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.ip));
        // setIpAddr(data.ip);
        formReference.setFieldsValue({ parameters: data.ip });
      });
  };

  useEffect(() => {
    getCurrentIPAddress();
  }, []);

  return (
    <>
      <Item name="parameters" label="IP Address" className="geolocator-params">
        <Search placeholder="Input IP Address" enterButton="Fetch" onSearch={onFetch} />
      </Item>
      {result && (
        <Item label="Output">
          {Object.entries(result).map(([key, value]) => (
            <Input key={key} style={{ color: 'black' }} value={`${capitalize(key)} : ${value}`} disabled />
          ))}
        </Item>
      )}
    </>
  );
};

export default GeoLocator;
