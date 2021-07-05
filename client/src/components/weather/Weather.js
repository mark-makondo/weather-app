import React from 'react';

// style
import './weather.scss';

// antd
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Spin from 'antd/lib/spin';
import Layout from 'antd/lib/layout';
import Button from 'antd/lib/button';

import { LoadingOutlined } from '@ant-design/icons';

const { Group, Search } = Input;
const { Option } = Select;
const { Content } = Layout;

const Weather = ({ onSelect, openWeatherMethods, loading, onSearch, selected, onScrape, onDelete }) => {
  const OptionSelect = () => {
    return (
      <Select defaultValue="By city name" onSelect={onSelect}>
        {openWeatherMethods &&
          openWeatherMethods.map((data, i) => (
            <Option key={i} value={data.title}>
              {data.title}
            </Option>
          ))}
      </Select>
    );
  };

  return (
    <div className="weather">
      <Spin
        spinning={loading}
        tip="Getting the methdods, please wait..."
        style={{ width: '100%', height: '100%' }}
        indicator={<LoadingOutlined style={{ color: 'white' }} />}
        size="large"
      >
        <div className="weather-container">
          <h1 style={{ color: 'white' }}>Weather Analyzer</h1>

          <Button onClick={onScrape}>Scrape Weather API</Button>
          <Button onClick={onDelete}>Delete Weather API</Button>

          <Group compact className="weather__search">
            <OptionSelect />
            <Search
              style={{ width: '70%' }}
              allowClear
              defaultValue="test"
              type="text"
              autoFocus
              onSearch={onSearch}
            ></Search>
          </Group>
        </div>
      </Spin>
    </div>
  );
};

export default Weather;
