import {LaunchArguments} from 'react-native-launch-arguments';
import MockTransactionApi from './mockedApis.ts/mockTransactionsApi';
import TransactionApi from './transactionsApi';
import AuthApi from './authApi';
import MockAuthApi from './mockedApis.ts/mockAuthApi';

const launchArgumentsValues = LaunchArguments.value();

export default {
  transansactions: (() => {
    if (launchArgumentsValues?.REACT_APP_IS_DETOX_TEST_MODE === true) {
      return new MockTransactionApi();
    } else {
      return new TransactionApi();
    }
  })(),
  auth: (() => {
    if (launchArgumentsValues?.REACT_APP_IS_DETOX_TEST_MODE === true) {
      return new MockAuthApi();
    } else {
      return new AuthApi();
    }
  })(),
};
