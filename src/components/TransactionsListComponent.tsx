import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {
  currencyIconsMap,
  fetchTransactions,
} from '../store/slices/transactionSlice';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {Avatar, Searchbar} from 'react-native-paper';
import Moment from 'moment';

const AvatarText = ({label = 'XD'}) => <Avatar.Text size={40} label={label} />;

type TransactionsListProps = {
  numberOfTransactions?: number;
  showFilter: boolean;
};

const TransactionsListComponent: React.FC<TransactionsListProps> = ({
  numberOfTransactions = 10,
  showFilter = true,
}) => {
  const dispatch = useAppDispatch();
  const {transactions, isLoading, error} = useAppSelector(
    state => state.transaction,
  );
  const [searchQuery, setSearchQuery] = useState('');

  const getAvatartextLabel = (name: string) => {
    const splitName = name.split(' ');
    if (splitName.length > 1) {
      return `${splitName[0][0]}${splitName[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const filteredTransactions = transactions
    .slice(0, numberOfTransactions)
    .filter(transaction => {
      const lowerCasedSearchQuery = searchQuery.toLowerCase();
      if (lowerCasedSearchQuery && lowerCasedSearchQuery.length === 0) {
        return transactions;
      }

      return (
        transaction.recipient.name
          .toLowerCase()
          .includes(lowerCasedSearchQuery) ||
        transaction.status.toLowerCase().includes(lowerCasedSearchQuery)
      );
    });

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View>
      {showFilter && (
        <Searchbar
          style={styles.searchBar}
          placeholder="Search transactions by name, status"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      )}
      <FlatList
        style={styles.listContainer}
        data={filteredTransactions}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <View style={styles.leftColumn}>
              <View style={styles.avatarTextContainer}>
                <AvatarText label={getAvatartextLabel(item.recipient.name)} />
              </View>
              <View>
                <Text style={(styles.mainText, styles.mainTextHeader)}>
                  {item.recipient.name}
                </Text>
                {/* <Text style={styles.mainText}>{item.date}</Text> */}
                <Text style={styles.mainText}>
                  {Moment(item.date).fromNow()}
                </Text>
              </View>
            </View>
            <View style={styles.rightColumn}>
              <Text
                style={[
                  styles.mainText,
                  styles.currencyIconAndAmountContainer,
                ]}>
                {currencyIconsMap[item.currency]}
                {item.amount}
              </Text>
              <Text style={styles.mainText}>{item.status}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default TransactionsListComponent;
