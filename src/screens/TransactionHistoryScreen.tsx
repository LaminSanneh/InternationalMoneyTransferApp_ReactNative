import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  StyleSheet,
} from 'react-native';
import {
  currencyIconsMap,
  fetchTransactions,
} from '../store/slices/transactionSlice';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {Avatar, Searchbar} from 'react-native-paper';
import Moment from 'moment';
import TransactionsListComponent from '../components/TransactionsListComponent';

const AvatarText = ({label = 'XD'}) => <Avatar.Text size={40} label={label} />;

const TransactionHistoryScreen: React.FC = () => {
  // const dispatch = useAppDispatch();
  // const {transactions, isLoading, error} = useAppSelector(
  //   state => state.transaction,
  // );
  // const [searchQuery, setSearchQuery] = useState('');

  // const getAvatartextLabel = (name: string) => {
  //   const splitName = name.split(' ');
  //   if (splitName.length > 1) {
  //     return `${splitName[0][0]}${splitName[1][0]}`.toUpperCase();
  //   }
  //   return name.substring(0, 2).toUpperCase();
  // };

  // useEffect(() => {
  //   dispatch(fetchTransactions());
  // }, [dispatch]);

  // const filteredTransactions = transactions.filter(transaction => {
  //   const lowerCasedSearchQuery = searchQuery.toLowerCase();
  //   return (
  //     transaction.recipient.name
  //       .toLowerCase()
  //       .includes(lowerCasedSearchQuery) ||
  //     transaction.status.toLowerCase().includes(lowerCasedSearchQuery)
  //   );
  // });

  // if (isLoading) {
  //   return <ActivityIndicator size="large" />;
  // }

  // if (error) {
  //   return <Text>Error: {error}</Text>;
  // }

  return (
    <View style={styles.container}>
      <TransactionsListComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  listContainer: {
    display: 'flex',
  },
  mainText: {
    fontSize: 10,
  },
  mainTextHeader: {
    color: '#000000',
    fontWeight: '600',
  },
  currencyIconAndAmountContainer: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  searchBar: {
    marginBottom: 10,
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftColumn: {
    width: '70%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarTextContainer: {
    marginRight: 10,
  },
  rightColumn: {
    width: '30%',
    alignItems: 'flex-end',
  },
});

export default TransactionHistoryScreen;
