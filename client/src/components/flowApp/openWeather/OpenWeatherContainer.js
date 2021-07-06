import React, { useEffect, useState } from 'react';

// ui
import OpenWeather from './OpenWeather';

const OpenWeatherContainer = ({ selectedMethod, methodsAvailable, isSecondAppForm = false, triggerData }) => {
  const [parameters, setParameters] = useState();

  useEffect(() => {
    if (methodsAvailable.length === 0 || !!!methodsAvailable) return;

    const params = methodsAvailable.filter((method) => method.title === selectedMethod)[0];
    console.log(methodsAvailable);
    setParameters(params);
  }, [selectedMethod, methodsAvailable]);

  const onReqChange = (e) => {
    // console.log(e.target.name);
  };

  console.log(parameters);
  return (
    <OpenWeather
      parameters={parameters}
      onReqChange={onReqChange}
      isSecondAppForm={isSecondAppForm}
      triggerData={triggerData}
    />
  );
};

export default OpenWeatherContainer;
