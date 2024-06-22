import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import {registerUser} from '../store/slices/authSlice';
import {useAppDispatch} from '../store/hooks';

const RegistrationScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = () => {
    dispatch(registerUser({email, password}));
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
      <Button title="Register" onPress={handleRegistration} />
    </View>
  );
};

export default RegistrationScreen;
