import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import {loginUser} from '../store/slices/authSlice';
import {useAppDispatch} from '../store/hooks';
import {ScreenProps} from '../navigation/AppNavigator';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';

const LoginScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<ScreenProps>();

  const handleLogin = () => {
    dispatch(loginUser({username: email, password})).then(() => {
      navigation.navigate('Home');
    });
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button mode="contained" onPress={handleLogin}>
        Login
      </Button>
    </View>
  );
};

export default LoginScreen;
