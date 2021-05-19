import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';
import { authReducer } from './slices/authSlice';
import { quizReducer } from './slices/quizSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  quiz: quizReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'quiz']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export { rootReducer, persistedReducer };
