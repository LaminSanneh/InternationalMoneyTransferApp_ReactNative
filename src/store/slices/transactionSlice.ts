import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
// import {AppThunk} from '../store';
import API from '../../api/Api';
import {API_URL} from '@env';

interface Transaction {
  id: number;
  date: string;
  amount: number;
  recipient: {id: string; name: string};
  status: string;
}

interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  isLoading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    transactionStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    transactionSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
    transactionFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchTransactionsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchTransactionsSuccess(state, action: PayloadAction<Transaction[]>) {
      state.isLoading = false;
      state.transactions = action.payload;
    },
    fetchTransactionsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  transactionStart,
  transactionSuccess,
  transactionFailure,
  fetchTransactionsStart,
  fetchTransactionsSuccess,
  fetchTransactionsFailure,
} = transactionSlice.actions;

export default transactionSlice.reducer;

export const createTransaction = createAsyncThunk<void, any>(
  'transactions/createTransaction',
  async (transactionData, {dispatch}) => {
    try {
      dispatch(transactionStart());
      const response = await axios.post('/api/transactions', transactionData);
      dispatch(transactionSuccess());
    } catch (error: any) {
      dispatch(transactionFailure(error.message));
    }
  },
);

export const fetchTransactions = createAsyncThunk<void>(
  'transactions/fetchTransactions',
  async (_, {dispatch}) => {
    try {
      dispatch(fetchTransactionsStart());
      // const resp = axios
      //   .get(`${API_URL}/transactions`)
      //   .then(res => {
      //     console.log(res);
      //   })
      // .catch(err => console.log(err));
      // console.log(`${API_URL}/transactions`);
      // console.log(resp);
      const response = await API.transansactions.getTransactions();
      // const response = await axios.get(`${API_URL}/transactions`);
      // const response = await axios.get('/api/transactions');
      // console.log('transactions response', response.data);
      // console.log(response);
      dispatch(fetchTransactionsSuccess(response.data));
    } catch (error: any) {
      dispatch(fetchTransactionsFailure(error.message));
    }
  },
);
// (): AppThunk => async dispatch => {
//   try {
//     dispatch(fetchTransactionsStart());
//     const response = await axios.get('/api/transactions'); // Assuming your backend API endpoint for fetching transactions
//     dispatch(fetchTransactionsSuccess(response.data));
//   } catch (error) {
//     dispatch(fetchTransactionsFailure(error.message));
//   }
// };

//   (transactionData: any): AppThunk =>
//   async dispatch => {
//     try {
//       dispatch(transactionStart());
//       // Make API call to payment gateway or service provider to process the transaction
//       const response = await axios.post('/api/transaction', transactionData);
//       dispatch(transactionSuccess());
//       // Handle success response
//     } catch (error) {
//       dispatch(transactionFailure(error.message));
//     }
//   };
