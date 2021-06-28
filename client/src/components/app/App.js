import React from 'react';

// style
import './app.scss';

// components
import WeatherContainer from 'components/weather/WeatherContainer';

const App = () => {
  return (
    <div className="app">
      <div className="app-container">
        <WeatherContainer />
      </div>
    </div>
  );
};

export default App;
