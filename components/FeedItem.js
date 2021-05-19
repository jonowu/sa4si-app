import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../constants/colors';
import { ProfilePicture } from './ProfilePicture';
import { Body, Heading } from './Typography';

const Container = styled.TouchableOpacity`
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
`;

const FeedItem = ({ completion }) => {
  return (
    <Container disabled>
      {completion.action.image?.publicUrlTransformed ? (
        <Image source={{ uri: completion.action.image?.publicUrlTransformed }} style={{ height: 100 }} />
      ) : (
        <Image source={require('../assets/action_default.png')} style={{ width: '100%', height: 100 }} />
      )}
      <View style={{ backgroundColor: colors.lightGrey }}>
        <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
          <TouchableOpacity>
            <ProfilePicture
              source={
                completion.user.profilePicture?.publicUrlTransformed
                  ? { uri: completion.user.profilePicture?.publicUrlTransformed }
                  : null
              }
              name={completion.user.name}
              containerStyle={{ marginTop: 10, marginRight: 10 }}
              size="small"
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, marginTop: 16, marginRight: 8 }}>
            <Heading variant={4} numberOfLines={1}>
              {completion.user.name}
            </Heading>
          </TouchableOpacity>
          <Body variant={5} style={{ marginLeft: 'auto', marginTop: 22 }}>
            {moment(completion.completionDate).fromNow()}
          </Body>
        </View>
        <Body variant={3} style={{ margin: 20 }}>{`I completed the action '${completion.action.title}'!`}</Body>
      </View>
    </Container>
  );
};

export { FeedItem };
