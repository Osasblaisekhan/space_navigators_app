import { configureStore } from '@reduxjs/toolkit';

import { createLogger } from 'redux-logger';

import Slice from './slice';

const logger = createLogger();
const Store = configureStore({
  reducer: {
    rocket: Slice,
  },
  // Add logger middleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(logger),
});

export default Store;
