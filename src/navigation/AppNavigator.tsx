import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import NewTransferScreen from '../screens/NewTransferScreen';
import TransactionHistoryScreen from '../screens/TransactionHistoryScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import LoginScreen from '../screens/LoginScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import {LaunchArguments} from 'react-native-launch-arguments';
import {useAppSelector} from '../store/hooks';
import authHeader from '../api/authHeader';
import LogoutScreen from '../screens/LogoutScreen';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  let isTest = false;
  const launchArgumentsValues = LaunchArguments.value();
  console.log(launchArgumentsValues);

  if (launchArgumentsValues?.REACT_APP_IS_DETOX_TEST_MODE === true) {
    isTest = true;
  }

  const token = useAppSelector(state => state.user.token);

  if (token !== null) {
    authHeader.initializeToken(token.accessToken);
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        defaultStatus={isTest ? 'open' : 'closed'}
        initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="New Transaction" component={NewTransferScreen} />
        <Drawer.Screen
          name="Transaction History"
          component={TransactionHistoryScreen}
        />
        <Drawer.Screen name="Register" component={RegistrationScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Update Profile" component={UpdateProfileScreen} />
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Logout" component={LogoutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
