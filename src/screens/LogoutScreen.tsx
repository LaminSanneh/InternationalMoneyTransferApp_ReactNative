import React from 'react';
import {StyleSheet, View} from 'react-native';
import {logoutUser} from '../store/slices/authSlice';
import {useAppDispatch} from '../store/hooks';
import {useNavigation} from '@react-navigation/native';
import {ScreenProps} from '../navigation/AppNavigator';
import {Button, Text} from 'react-native-paper';

const LogoutScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ScreenProps>();

  const handleLogoutAccept = () => {
    dispatch(logoutUser()).then(() => {
      navigation.navigate('Login');
    });
  };

  const handleLogoutReject = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {/* <Text variant="labelLarge">Are you sure you want to log out?</Text>
      <Text variant="headlineLarge">Are you sure you want to log out?</Text> */}
      <Text variant="titleLarge">Are you sure you want to log out?</Text>
      <Button
        style={[styles.buttons, styles.buttonYes]}
        mode="contained"
        onPress={handleLogoutAccept}>
        Yes
      </Button>
      <Button
        style={styles.buttons}
        mode="contained"
        onPress={handleLogoutReject}>
        No
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  buttonYes: {
    marginTop: 20,
  },
  buttons: {
    marginBottom: 20,
  },
});

export default LogoutScreen;
