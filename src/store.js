import { configureStore } from '@reduxjs/toolkit';

import { createLogger } from 'redux-logger';

import Slice from './slice';

const logger = createLogger();
const Store = configureStore({
  reducer: {
    rocketMission: Slice,
  },
  // Add logger middleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(logger),
});

export default Store;
