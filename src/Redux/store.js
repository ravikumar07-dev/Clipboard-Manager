import { configureStore } from '@reduxjs/toolkit';
import pasteReducer from './pasteSlice';
import storage from 'redux-persist/lib/storage'; // uses localStorage
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

// 1. Persistence Config
const persistConfig = {
  key: 'root',
  storage,
};

// 2. Combine reducers (you can add more later)
const rootReducer = combineReducers({
  paste: pasteReducer,
});

// 3. Wrap root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configure store properly with middleware as callback
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// 5. Export persistor
export const persistor = persistStore(store);
