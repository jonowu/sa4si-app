import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { View, ScrollView } from 'react-native';

import { Body } from '../components/Typography';
import { FeedItem } from '../components/FeedItem';

const GET_COMPLETIONS = gql`
  query GET_COMPLETIONS {
    allCompletions(orderBy: { completionDate: desc }) {
      id
      completionDate
      user {
        id
        name
        profilePicture {
          publicUrlTransformed
        }
      }
      action {
        id
        title
        image {
          publicUrlTransformed
        }
      }
      kudos {
        id
      }
    }
  }
`;

const Feed = ({ navigation }) => {
  const { loading, error, data = {} } = useQuery(GET_COMPLETIONS);

  if (loading) return <Body>Loading...</Body>;
  if (error) return <Body>Error! ${error.message}</Body>;

  const { allCompletions } = data;

  return (
    <View style={{ paddingHorizontal: 10, height: '100%' }}>
      <ScrollView>
        {allCompletions.map((completion) => (
          <View style={{ marginTop: 10 }} key={completion.id}>
            <FeedItem completion={completion} navigation={navigation} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export { Feed, GET_COMPLETIONS };
