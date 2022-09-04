// Redux Imports
import rootReducer from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
});

export { store };
