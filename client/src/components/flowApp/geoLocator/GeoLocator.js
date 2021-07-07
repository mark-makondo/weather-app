import React, { useEffect } from 'react';

//helper
import { capitalize } from 'helper/functions';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';

const { Item } = Form;
const { Search } = Input;
const GeoLocator = ({ onFetch, loading, result, formReference }) => {
  //
  const getCurrentIPAddress = () => {
    // console.log('test');
    // const url = 'https://api.ipify.org/?format=json';
    const url = 'https://ip.seeip.org/jsonip?'; //https://ip4.seeip.org/json
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
