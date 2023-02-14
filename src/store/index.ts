import { configureStore } from '@reduxjs/toolkit';
import GameStateReducer from './GameStateSlice';
import ColorSchemeReducer from './ColorSchemeSlice';
import SettingReducer from './SettingSlice';
import RecordReducer from './RecordSlice';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage
};

const reducer = combineReducers({
  gameState: GameStateReducer,
  colorScheme: ColorSchemeReducer,
  setting: SettingReducer,
  record: RecordReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

// Define Root State and Dispatch Types
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Reference:
// https://redux-toolkit.js.org/tutorials/typescript

export const persistor = persistStore(store);
