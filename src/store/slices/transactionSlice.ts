import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import API from '../../api/Api';

interface CurrencyIconMapInterface {
  [index: string]: string;
}

export const currencyIconsMap: CurrencyIconMapInterface = {
  USD: '$',
  EUR: 'Є',
  GBP: '£',
};

interface Transaction {
  id: number;
  date: string;
  amount: number;
  recipient: {id: string; name: string};
  status: string;
  currency: string;
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
    addTransactionsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    addTransactionsSuccess(state, action: PayloadAction<Transaction>) {
      state.isLoading = false;
      state.transactions = [...state.transactions, action.payload];
    },
    addTransactionsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTransactionsStart,
  fetchTransactionsSuccess,
  fetchTransactionsFailure,
  addTransactionsStart,
  addTransactionsSuccess,
  addTransactionsFailure,
} = transactionSlice.actions;

export default transactionSlice.reducer;

export const fetchTransactions = createAsyncThunk<void>(
  'transactions/fetchTransactions',
  async (_, {dispatch}) => {
    try {
      dispatch(fetchTransactionsStart());
      const response = await API.transansactions.getTransactions();
      dispatch(fetchTransactionsSuccess(response.data));
    } catch (error: any) {
      dispatch(fetchTransactionsFailure(error.message));
    }
  },
);

export const addTransaction = createAsyncThunk<void, any>(
  'transactions/addTransaction',
  async (transactionData, {dispatch}) => {
    try {
      dispatch(addTransactionsStart());
      const response = await API.transansactions.addTransaction(
        transactionData,
      );
      dispatch(addTransactionsSuccess(response.data));
    } catch (error: any) {
      dispatch(addTransactionsFailure(error.message));
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
