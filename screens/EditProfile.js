import { Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { CURRENT_USER_QUERY, useUser } from '../hooks/useUser';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useMutation, gql } from '@apollo/client';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ProfilePicture } from '../components/ProfilePicture';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION(
    $id: ID!
    $name: String!
    $biography: String!
    $areasOfInterest: String!
    $funFacts: String!
  ) {
    updateUser(
      id: $id
      data: { name: $name, biography: $biography, areasOfInterest: $areasOfInterest, funFacts: $funFacts }
    ) {
      id
      name
      biography
      areasOfInterest
      funFacts
    }
  }
`;

const EditProfile = ({ navigation }) => {
  const user = useUser();

  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    // refetch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    onCompleted: () => navigation.goBack(),
  });

  return (
    <View style={{ padding: 10 }}>
      <Formik
        initialValues={{
          name: user.name || '',
          biography: user.biography || '',
          areasOfInterest: user.areasOfInterest || '',
          funFacts: user.funFacts || '',
          id: user.id,
        }}
        onSubmit={async (values) => await updateUser({ variables: values })}
      >
        {({ initialValues, handleSubmit, handleChange, values }) => (
          <View>
            <View style={{ display: 'flex', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => {}}>
                <ProfilePicture size="large" source={user.profilePicture} name={user.name} />
                <MaterialCommunityIcons
                  name="pencil-circle"
                  size={30}
                  style={{ position: 'absolute', top: 55, left: 45 }}
                />
              </TouchableOpacity>
            </View>
            <Input label="Full Name" onChangeText={handleChange('name')} value={values.name} />
            <Input label="Biography" onChangeText={handleChange('biography')} value={values.biography} />
            <Input
              label="Areas of Interest"
              onChangeText={handleChange('areasOfInterest')}
              value={values.areasOfInterest}
            />
            <Input label="Fun Facts" onChangeText={handleChange('funFacts')} value={values.funFacts} />
            <Button disabled={values === initialValues} title="Save" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export { EditProfile };

/* import React, { useContext, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import styled from 'styled-components/native';

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
          `localhost:3344/users/${userContext.id}`,
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
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always" extraScrollHeight={60}>
        <View style={{ padding: 15 }}>
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
          <Input label="Bio" value={information} onChangeText={(value) => setInformation(value)} />
          <Input
            label="Areas Of Interest"
            value={areasOfInterest}
            onChangeText={(value) => setAreasOfInterest(value)}
          />
          <Input label="Sustainable Fun Facts" value={funFacts} onChangeText={(value) => setFunFacts(value)} />
          <AuthenticatedContext.Consumer>
            {({ setUser }) => <Button title="Save Changes" disabled={loading} onPress={() => updateUser(setUser)} />}
          </AuthenticatedContext.Consumer>
          {loading && <ActivityIndicator size="large" />}
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
}

export default EditProfileScreen;
 */
