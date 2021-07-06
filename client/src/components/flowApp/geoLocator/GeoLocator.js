import React from 'react';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

const { Item } = Form;

const GeoLocator = ({ onInputChange, onFetch, loading }) => {
  return (
    <Item label="IP Address">
      <Input onChange={onInputChange} />
      <Button type="primary" onClick={onFetch} loading={loading} children={'Fetch'} />
    </Item>
  );
};

export default GeoLocator;
