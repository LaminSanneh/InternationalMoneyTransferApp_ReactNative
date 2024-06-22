import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {API_URL} from '@env';
import axios from 'axios';
import authHeader from '../api/authHeader';
import {Button, Checkbox, Text, TextInput} from 'react-native-paper';
import {
  Autocomplete,
  AutocompleteScrollView,
} from 'react-native-paper-autocomplete';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {addTransaction} from '../store/slices/transactionSlice';
import Toast from 'react-native-toast-message';

function NewTransferScreen() {
  const [currencies] = useState([
    {value: 'USD', label: 'USD'},
    {value: 'GBP', label: 'GBP'},
    {value: 'EUR', label: 'EUR'},
  ]);

  const dispatch = useAppDispatch();
  const [recipient, setRecipient] = useState('');
  const [newRecipient, setNewRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [sourceCurrency, setSourceCurrency] = useState(currencies[0]);
  const [recipientCurrency, setRecipientCurrency] = useState(currencies[0]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [newRecipientCheckActive, setNewRecipientCheckActive] = useState(false);
  const {isLoading} = useAppSelector(state => {
    return state.transaction;
  });

  const handleTransfer = () => {
    Toast.show({
      type: 'success',
      text1: 'Successfully Tranferred',
      text2: 'Thank you! 👋',
    });

    return;
    // TODO: Use actual user id here or get id fro backend since user should be logged in
    const senderId = 1;
    const currency = sourceCurrency.value;

    let recipientName = '';
    if (newRecipientCheckActive) {
      recipientName = newRecipient;
    } else {
      recipientName = recipient;
    }

    if (
      recipientName.trim() === '' ||
      amount.trim() === '' ||
      currency.trim() === ''
    ) {
      // TODO: Display error message for incomplete form
      return;
    }

    const recipientObject = {
      name: recipientName,
    };

    console.log({recipient: recipientObject, amount, currency, senderId});

    // TODO: Additional validation logic as needed
    dispatch(
      addTransaction({recipient: recipientObject, amount, currency, senderId}),
    )
      .unwrap()
      .then(results => {
        Toast.show({
          type: 'success',
          text1: 'Successfully Tranferred',
          text2: 'Thank you! 👋',
        });
        console.log(results);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchSavedRecipients();
  }, []);

  const fetchSavedRecipients = async () => {
    console.log('Fetching');
    const headers = {headers: authHeader.getAuthHeader()};
    const response = await axios.get(`${API_URL}/beneficiaries`, headers);
    console.log('Beneficiaries response');
    console.log(response);
    setBeneficiaries(response.data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.newRecipientTopLabel} variant="titleLarge">
        Select a saved recipient or enter a new one manually
      </Text>
      <AutocompleteScrollView>
        <Autocomplete
          onChange={(newValue: {name: string} | any) => {
            console.log(newValue);
            setRecipient(newValue.name);
          }}
          value={beneficiaries[0]}
          options={beneficiaries}
          inputProps={{
            label: 'Select Beneficiary or Receiver',
            disabled: newRecipientCheckActive,
            // ...all other props which are available in react native paper
          }}
        />
      </AutocompleteScrollView>
      <View style={styles.newRecipientCheckboxContainer}>
        <Text variant="labelMedium">New Recipient</Text>
        <Checkbox
          status={newRecipientCheckActive ? 'checked' : 'unchecked'}
          onPress={() => {
            setNewRecipientCheckActive(!newRecipientCheckActive);
          }}
        />
      </View>
      <TextInput
        style={styles.newRecipientNameInput}
        label="New Recipient Name"
        readOnly={!newRecipientCheckActive}
        value={newRecipient}
        onChangeText={setNewRecipient}
      />
      {/* <TextInput
              label="Recipient Address"
              value={recipientAddress}
              onChangeText={setRecipientAddress}
            />
            <TextInput
              label="Bank Account"
              value={bankAccount}
              onChangeText={setBankAccount}
            /> */}
      <TextInput
        style={styles.newRecipientAmountInput}
        label="Amount"
        value={amount}
        onChangeText={setAmount}
      />
      <View style={styles.currencySelectorContainer}>
        {/* <Text>Select Recipient Currency</Text> */}
        <AutocompleteScrollView>
          <Autocomplete
            onChange={(newValue: {value: string} | any) => {
              console.log(newValue.value);
              // setSourceCurrency(newValue.value);
              setSourceCurrency(newValue);
            }}
            value={sourceCurrency}
            options={currencies}
            inputProps={{
              label: 'Source Currency',
            }}
          />
        </AutocompleteScrollView>
        <AutocompleteScrollView>
          <Autocomplete
            onChange={(newValue: {value: string} | any) => {
              console.log(newValue.value);
              // setRecipientCurrency(newValue.value);
              setRecipientCurrency(newValue);
            }}
            value={recipientCurrency}
            options={currencies}
            inputProps={{
              label: 'Recipient Currency',
            }}
          />
        </AutocompleteScrollView>
      </View>
      {/* <TextInput
              label="Currency"
              value={currency}
              onChangeText={setSourceCurrency}
            /> */}
      {/* <TextInput label="Note" value={note} onChangeText={setNote} /> */}
      <View style={styles.newTransferSubmitButtonContainer}>
        <Button
          loading={isLoading}
          onPress={handleTransfer}
          icon="cash"
          mode="contained">
          Transfer Money
        </Button>
      </View>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  newRecipientCheckboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  newRecipientNameInput: {
    marginBottom: 15,
  },
  newRecipientAmountInput: {
    marginBottom: 15,
  },
  newRecipientTopLabel: {
    marginBottom: 15,
  },
  newTransferSubmitButtonContainer: {
    marginTop: 15,
  },
  currencySelectorContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
});

export default NewTransferScreen;
