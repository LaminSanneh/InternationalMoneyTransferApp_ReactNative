import React from 'react';
import {Alert, Button, Text, View} from 'react-native';
import {logoutUser} from '../store/slices/authSlice';
import {useAppDispatch} from '../store/hooks';

const LogoutScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogoutAccept = () => {
    dispatch(logoutUser());
  };

  const handleLogoutReject = () => {
    Alert.alert('Logout rejected');
  };

  return (
    <View>
      <Text>Are you sure you want to log out?</Text>
      <Button title="Yes" onPress={handleLogoutAccept} />
      <Button title="No" onPress={handleLogoutReject} />
    </View>
  );
};

export default LogoutScreen;
