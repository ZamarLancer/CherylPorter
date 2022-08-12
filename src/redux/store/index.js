import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import userReducer from "../reducers/user";
import dataReducer from "../reducers/data";

const rootReducer = combineReducers({
  user: userReducer,
  data: dataReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore all actions that redux-persist has
        // https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
      },
    }),
});

export const persistor = persistStore(store);
