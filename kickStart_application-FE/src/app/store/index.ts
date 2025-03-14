import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { formReducer } from '@entities/form';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  form: formReducer,
});

const persistConfig = {
  key: 'root', // localStorage Key name
  storage, // use browser's localStorage
  whitelist: ['form'], // 새로고침 해도 유지할 상태들
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;

// RootState 타입 추출 및 export
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
