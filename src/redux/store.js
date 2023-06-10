
import { configureStore } from '@reduxjs/toolkit';
import typingGameReducer from './typingGameSlice';

const store = configureStore({
  reducer: {
    typingGame: typingGameReducer,
  },
});

export default store;
