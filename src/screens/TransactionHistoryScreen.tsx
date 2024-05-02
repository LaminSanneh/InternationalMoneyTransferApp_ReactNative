import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator, TextInput} from 'react-native';
import {fetchTransactions} from '../store/slices/transactionSlice'; // Assuming transactionSlice contains Redux actions and reducers for transactions
import {useAppDispatch, useAppSelector} from '../store/hooks';

const TransactionHistoryScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const {transactions, isLoading, error} = useAppSelector(
    state => state.transaction,
  );
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const filteredTransactions = transactions.filter(transaction => {
    return transaction.recipient.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View>
      <TextInput
        placeholder="Search recipient"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredTransactions}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View>
            <Text>Date: {item.date}</Text>
            <Text>Amount: {item.amount}</Text>
            <Text>Recipient: {item.recipient.name}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Transaction ID: {item.id}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TransactionHistoryScreen;
