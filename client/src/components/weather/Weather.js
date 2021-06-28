import React from 'react';

// style
import './weather.scss';

// antd
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';

const { Group, Search } = Input;
const { Option } = Select;

const Weather = ({ onSelect, data }) => {
  const OptionSelect = () => {
    return (
      <Select defaultValue="Name" onChange={onSelect}>
        {data.map((data, i) => (
          <Option key={i} value={data.text}>
            {data.text}
          </Option>
        ))}
      </Select>
    );
  };

  return (
    <div className="weather">
      <div className="weather-container">
        <h1 style={{ color: 'white' }}>Weather Analyzer</h1>

        <Group compact className="weather__search">
          <OptionSelect />
          <Search style={{ width: '70%' }} allowClear defaultValue="test" type="text"></Search>
        </Group>
      </div>
    </div>
  );
};

export default Weather;
