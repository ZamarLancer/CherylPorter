import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/user';
import dataReducer from '../reducers/data';

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore all actions that redux-persist has
        // https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
      }
    })
});
