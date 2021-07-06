import React from 'react';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

const { Item } = Form;

const OpenWeather = ({ parameters, onReqChange }) => {
  return (
    <>
      <Item label="Required Parameters">
        {parameters?.required
          .filter((data) => !data.includes('appid'))
          .map((req, i) => (
            <Input
              key={i}
              placeholder={`Enter ${req[0]}`}
              name={req[0] === 'lat, lon' ? 'geo' : req[0]}
              onChange={onReqChange}
            />
          ))}
      </Item>
      <Item label="Optional Parameters">
        {parameters?.optional.map((req, i) => (
          <Input key={i} placeholder={`Enter ${req[0]}`} />
        ))}
      </Item>
    </>
  );
};

export default OpenWeather;
