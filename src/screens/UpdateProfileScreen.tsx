import React, {useEffect, useState} from 'react';
import {View, Alert, Text, StyleSheet} from 'react-native';
import {
  fetchProfile,
  updateProfile,
  uploadDocument,
} from '../store/slices/authSlice';
import DocumentPicker from 'react-native-document-picker';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {Button, TextInput} from 'react-native-paper';

const UpdateProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [documentUri, setDocumentUri] = useState<string | null>(null);
  const user = useAppSelector(state => state.user.user);

  useEffect(() => {
    dispatch(fetchProfile()).then(() => {
      console.log(user);
      if (user) {
        setName(user.name);
        setEmail(user.username);
        setAddress(user.address);
      }
    });
  }, [dispatch]);

  const handleUpdateProfile = () => {
    dispatch(updateProfile({name, address}));
  };

  const handleUploadDocument = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      const res = results[0];
      setDocumentUri(res.uri);
      const formData = new FormData();
      formData.append('file', {
        uri: res.uri,
        type: res.type,
        name: res.name,
      });
      dispatch(uploadDocument(formData));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        Alert.alert('Error', 'Failed to pick a document');
      }
    }
  };

  return (
    <View style={style.mainContainer}>
      <View style={style.inputContainer}>
        <TextInput
          label="Name"
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>
      <View style={style.inputContainer}>
        <TextInput
          readOnly={true}
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={style.inputContainer}>
        <TextInput
          label="Address"
          value={address}
          onChangeText={text => setAddress(text)}
        />
      </View>
      {/* <View style={style.inputContainer}>
        <Text>Updated Profile</Text>
      </View> */}
      <View style={style.inputContainer}>
        <Button icon="image" mode="contained" onPress={handleUpdateProfile}>
          Update Profile
        </Button>
      </View>
      <View style={style.inputContainer}>
        <Button icon="book" mode="contained" onPress={handleUploadDocument}>
          Upload Document
        </Button>
      </View>
      {documentUri && <Text>Uploaded Document: {documentUri}</Text>}
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    padding: 15,
  },
  inputContainer: {
    marginBottom: 20,
  },
});

export default UpdateProfileScreen;
