import React, { useContext, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import styled from 'styled-components/native';

import { api } from '../../data';
import { AuthenticatedContext } from '../../context/authenticated-context';
import ProfilePicture from '../../components/profile-picture';
import Screen from '../../components/screen';
import Input from '../../components/input';
import Button from '../../components/button';

const HeaderView = styled.View`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

function EditProfileScreen({ route }) {
  const { profileInfo } = route.params;
  const authContext = useContext(AuthenticatedContext);
  const userContext = authContext.user.data;

  const [information, setInformation] = useState(profileInfo.information);
  const [areasOfInterest, setAreasOfInterest] = useState(profileInfo.areasOfInterest);
  const [funFacts, setFunFacts] = useState(profileInfo.funFacts);
  const [profilePictureToUpload, setProfilePictureToUpload] = useState();
  const [loading, setLoading] = useState(false);
  const [currentProfilePicture, setCurrentProfilePicture] = useState(profileInfo.profilePicture?.url);

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setProfilePictureToUpload({ localUri: pickerResult.uri });
  };

  async function updateUser(setUser) {
    const token = await AsyncStorage.getItem('token');

    setLoading(true);

    function updateTextFields() {
      axios
        .put(
          `${api}/users/${userContext.id}`,
          {
            information: information,
            areasOfInterest: areasOfInterest,
            funFacts: funFacts,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setUser({ data: response.data });
        })
        .catch((error) => {
          error.response.data.message[0].messages.forEach((errMsg) => alert(errMsg.message)); // display alert for each error
        });
    }

    if (profilePictureToUpload) {
      // get the file extension
      const uriParts = profilePictureToUpload.localUri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      // create formData with required keys for strapi upload
      const formData = new FormData();
      formData.append('files', {
        uri: profilePictureToUpload.localUri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
      formData.append('refId', userContext.id);
      formData.append('ref', 'user');
      formData.append('field', 'profilePicture');
      formData.append('source', 'users-permissions');

      axios({
        method: 'post',
        url: `${api}/upload`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      })
        .then(() => {
          setCurrentProfilePicture(profilePictureToUpload.localUri);
          setProfilePictureToUpload(); // clear profilePictureToUpload, so it doesn't run again
          updateTextFields(); // update the text fields
          alert('Account details updated successfully!');
          setLoading(false);
        })
        .catch((error) => {
          alert(JSON.stringify(error.response));
          setLoading(false);
        });
    } else {
      updateTextFields();
      alert('Account details updated successfully!');
      setLoading(false);
    }
  }

  return (
    <Screen>
      <ScrollView style={{ padding: 20 }}>
        <HeaderView>
          <TouchableOpacity onPress={openImagePickerAsync}>
            <ProfilePicture
              size="large"
              source={
                // three conditions; profilePictureToUpload exists,
                // userContext.profilePicture?.url exists, or null.
                profilePictureToUpload?.localUri
                  ? { uri: profilePictureToUpload?.localUri }
                  : currentProfilePicture
                  ? { uri: currentProfilePicture }
                  : null
              }
              firstName={userContext.firstName}
              lastName={userContext.lastName}
            />
            <MaterialCommunityIcons
              name="pencil-circle"
              size={30}
              style={{ position: 'absolute', top: 55, left: 45 }}
            />
          </TouchableOpacity>
        </HeaderView>
        <Input label="Information" value={information} onChangeText={(value) => setInformation(value)} />
        <Input label="Areas Of Interest" value={areasOfInterest} onChangeText={(value) => setAreasOfInterest(value)} />
        <Input label="Fun Facts" value={funFacts} onChangeText={(value) => setFunFacts(value)} />
        <AuthenticatedContext.Consumer>
          {({ setUser }) => <Button title="Save Changes" disabled={loading} onPress={() => updateUser(setUser)} />}
        </AuthenticatedContext.Consumer>
      </ScrollView>
    </Screen>
  );
}

export default EditProfileScreen;
