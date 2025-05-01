import React from 'react';

import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';

import App from './components/App';

import Store from './store';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>

  </React.StrictMode>,
);
