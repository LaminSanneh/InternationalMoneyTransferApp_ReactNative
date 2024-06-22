import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreenProps} from '../navigation/AppNavigator';
import {Button, Text, TextInput} from 'react-native-paper';
import TransactionsListComponent from '../components/TransactionsListComponent';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<ScreenProps>();

  AsyncStorage.getAllKeys((err, keys) => {
    return AsyncStorage.multiGet(keys, (err2, values) => {
      console.log(keys);
      console.log(values);
    });
  });

  const handleTransactionHistory = () => {
    navigation.navigate('Transaction History');
  };

  const handleSupport = () => {
    navigation.navigate('Support');
  };

  const handleFeedback = () => {
    navigation.navigate('Feedback');
  };

  return (
    <View style={styles.container}>
      {/* <View>
        <Button
          style={styles.button}
          onPress={handleTransactionHistory}
          mode="contained">
          Saa All Transactions
        </Button>
      </View> */}
      <View>
        <Text style={styles.recentTransactionsLabel} variant="titleLarge">Recent Transactions</Text>
        <TransactionsListComponent numberOfTransactions={3} showFilter={false} />
        <Button
          style={styles.recentTransactionsSeeAllButton}
          onPress={handleTransactionHistory}
          mode="contained">
          Saa All Transactions
        </Button>
      </View>
      <View>
        <Button style={styles.button} onPress={handleSupport} mode="contained">
          Get Support
        </Button>
        <Button style={styles.button} onPress={handleFeedback} mode="contained">
          Provide Feedback
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 15,
    // flexDirection: 'column',
  },
  button: {
    marginBottom: 15,
  },
  recentTransactionsLabel: {
    marginBottom: 10,
  },
  recentTransactionsSeeAllButton: {
    marginTop: 15,
  },
});

export default HomeScreen;
