import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from 'components/app/AppContainer.js';

// style
import 'scss/global.scss';

ReactDOM.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>,
  document.getElementById('root')
);
