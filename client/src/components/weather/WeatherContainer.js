import React from 'react';

// ui
import Weather from './Weather';

// helper
import { arrayToObjects } from 'helper/functions';

const data = [
  {
    text: 'City Name',
    params: ['q', 'mode'],
  },
  {
    text: 'City ID',
    params: ['q', 'mode'],
  },
  {
    text: 'Geo Coordinates',
    params: ['q', 'mode'],
  },
  {
    text: 'Zip Code',
    params: ['q', 'mode'],
  },
];

const WeatherContainer = () => {
  const sample = data[0].params;

  console.log(sample);
  var obj = arrayToObjects(sample);
  //   obj.q = 'sampe';

  console.log(obj);

  const onSelect = (selected) => {
    console.log(selected);
  };

  return <Weather onSelect={onSelect} data={data} />;
};

export default WeatherContainer;
