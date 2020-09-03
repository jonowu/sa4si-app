import React from 'react';
import { ActivityIndicator, Text } from 'react-native';

import Markdown from 'react-native-markdown-display';
import { gql, useQuery } from '@apollo/client';
import { sdgs as sdgData } from '../../data/sdgs';

import ChildScreen from '../../components/child-screen';

const GET_SDG = gql`
  query GetSdg($sdgNo: ID!) {
    sdg(id: $sdgNo) {
      id
      body
    }
  }
`;

const Sdg = ({ route }) => {
  const { sdgNo } = route.params;
  const { loading, error, data = {} } = useQuery(GET_SDG, {
    variables: { sdgNo: sdgNo },
  });
  const { sdg } = data;

  const currentSdgData = sdgData[sdgNo - 1];

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    console.error(error);
    return <Text>Error</Text>;
  }

  return (
    <ChildScreen headerColor={currentSdgData.color} sdgImageSrc={currentSdgData.src}>
      <Markdown>{sdg.body}</Markdown>
    </ChildScreen>
  );
};

export default Sdg;
