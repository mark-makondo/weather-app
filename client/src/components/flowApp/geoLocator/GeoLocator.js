import React from 'react';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

const { Item } = Form;

const GeoLocator = ({ onInputChange, onFetch, loading, result }) => {
  console.log(result, 'sadsadsad');
  const capitalize = (value) => {
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
  };
  return (
    <>
      <Item label="IP Address" className="geolocator-params">
        <Input onChange={onInputChange} />
        <Button type="primary" onClick={onFetch} loading={loading} children={'Fetch'} />
      </Item>
      {result && (
        <Item label="Preview">
          {Object.entries(result).map(([key, value]) => (
            <Input key={key} style={{ color: 'black' }} value={`${capitalize(key)} : ${value}`} disabled />
          ))}
        </Item>
      )}
    </>
  );
};

export default GeoLocator;
