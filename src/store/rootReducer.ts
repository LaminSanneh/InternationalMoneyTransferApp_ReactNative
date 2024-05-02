import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Assuming you are using AsyncStorage for Redux persist

import userReducer from '../store/slices/authSlice';
import transactionReducer from '../store/slices/transactionSlice';

const rootReducer = combineReducers({
  user: userReducer,
  transaction: transactionReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['transaction', 'user'],
};

export default persistReducer(persistConfig, rootReducer);
