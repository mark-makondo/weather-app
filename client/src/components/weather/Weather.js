import React from 'react';

// style
import './weather.scss';

// antd
import Spin from 'antd/lib/spin';
import Button from 'antd/lib/button';

import { LoadingOutlined } from '@ant-design/icons';

const Weather = ({ loading, onOpenWeatherScrape }) => {
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

          <Button onClick={onOpenWeatherScrape}>Scrape Weather API</Button>
        </div>
      </Spin>
    </div>
  );
};

export default Weather;
