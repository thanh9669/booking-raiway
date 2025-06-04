import { configureStore, combineReducers } from '@reduxjs/toolkit';
import employerStore from './employer';
import messageStore from './message';
import expenseReducer from './expense';
import learnStore from './learn';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Cấu hình persist
const persistConfig = {
  key: 'root',
  storage,
};

// Kết hợp các reducers lại với nhau
const rootReducer = combineReducers({
  employer: employerStore,
  message: messageStore,
  expense: expenseReducer,
  learn: learnStore,
});

// Sử dụng persistReducer với rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Khởi tạo store bình thường
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Tránh lỗi Redux Persist
    }),
});

// Khởi tạo persistor
export const persistor = persistStore(store);

// Định nghĩa kiểu dữ liệu cho store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
