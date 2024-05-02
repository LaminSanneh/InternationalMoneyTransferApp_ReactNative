import React from 'react';
import {Button, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (err2, values) => {
      console.log(keys);
      console.log(values);
    });
  });

  const handleSupport = () => {
    navigation.navigate('Support');
  };

  const handleFeedback = () => {
    navigation.navigate('Feedback');
  };

  return (
    <View>
      <Button title="Get Support" onPress={handleSupport} />
      <Button title="Provide Feedback" onPress={handleFeedback} />
    </View>
  );
};

export default HomeScreen;
