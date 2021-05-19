import { useMutation } from '@apollo/client';
import { View, Button } from 'react-native';
import gql from 'graphql-tag';
import React from 'react';
import { isEmpty } from 'lodash';

import { CURRENT_USER_QUERY, useUser } from '../hooks/useUser';
import { ProfilePicture } from '../components/ProfilePicture';
import { Body, Subheading } from '../components/typography';
import { colors } from '../constants/colors';

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

const Profile = ({ navigation }) => {
  const [signOut] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const user = useUser();

  return (
    <View style={{ alignItems: 'center', paddingTop: 20 }}>
      <ProfilePicture
        name={user.name}
        source={{ uri: user.profilePicture?.publicUrlTransformed }}
        containerStyle={{ marginBottom: 10 }}
        size={100}
      />
      <Subheading bold>{user.name}</Subheading>
      {!isEmpty(user.biography) && (
        <>
          <Subheading bold variant={2} color={colors.blue}>
            Biography
          </Subheading>
          <Body variant={3}>{user.biography}</Body>
        </>
      )}
      {!isEmpty(user.areasOfInterest) && (
        <>
          <Subheading bold variant={2} color={colors.purple}>
            Areas of Interest
          </Subheading>
          <Body variant={3}>{user.areasOfInterest}</Body>
        </>
      )}
      {!isEmpty(user.funFacts) && (
        <>
          <Subheading bold variant={2} color={colors.green}>
            Sustainable Fun Facts
          </Subheading>
          <Body variant={3}>{user.funFacts}</Body>
        </>
      )}
      <View style={{ marginTop: 5, marginBottom: 5 }}>
        <Button title="Edit Profile" onPress={() => navigation.navigate('Edit Profile')} />
      </View>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

export { Profile };
