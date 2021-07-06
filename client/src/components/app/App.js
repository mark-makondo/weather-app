import React from 'react';

// style
import './app.scss';

// components
// import WeatherContainer from 'components/weather/WeatherContainer';
import FlowAppContainer from 'components/flowApp/FlowAppContainer';

const App = () => {
  return (
    <div className="app">
      <div className="app-container">
        {/* <WeatherContainer /> */}
        <FlowAppContainer />
      </div>
    </div>
  );
};

export default App;
