import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  StackNavigationProp,
  // createStackNavigator,
} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
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
import { Text } from 'react-native-paper';

export type RootStackParamList = {
  Home: undefined;
  'New Transaction': undefined;
  'Transaction History': undefined;
  Register: undefined;
  Profile: undefined;
  'Update Profile': undefined;
  Update: undefined;
  Login: undefined;
  Logout: undefined;
};

export type ScreenProps = StackNavigationProp<
  RootStackParamList,
  | 'New Transaction'
  | 'Home'
  | 'Register'
  | 'Transaction History'
  | 'Update Profile'
  | 'Update'
  | 'Login'
  | 'Logout'
>;

const Drawer = createDrawerNavigator<RootStackParamList>();

// const Stack = createStackNavigator();

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
        {token !== null ? (
          <>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen
              name="New Transaction"
              component={NewTransferScreen}
            />
            <Drawer.Screen
              name="Transaction History"
              component={TransactionHistoryScreen}
            />
            <Drawer.Screen
              name="Update Profile"
              component={UpdateProfileScreen}
            />
            <Drawer.Screen name="Logout" component={LogoutScreen} />
          </>
        ) : (
          <>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Login" component={LoginScreen} />
            <Drawer.Screen name="Register" component={RegistrationScreen} />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
