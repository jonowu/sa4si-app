import React from 'react';

import { gql } from '@apollo/client';
import { sdgs as sdgData } from '../../data/sdgs';

import ChildScreen from '../../components/child-screen';
import Markdown from '../../components/markdown';
import Query from '../../components/query';

const GET_SDG_QUERY = gql`
  query GetSdg($id: ID!) {
    sdg(id: $id) {
      id
      body
    }
  }
`;

const Sdg = ({ route }) => {
  const { sdgNo } = route.params;

  const currentSdgData = sdgData[sdgNo - 1];

  return (
    <ChildScreen headerColor={currentSdgData.color} sdgImageSrc={currentSdgData.src}>
      <Query query={GET_SDG_QUERY} id={sdgNo}>
        {({ data: { sdg } }) => {
          return <Markdown>{sdg.body}</Markdown>;
        }}
      </Query>
    </ChildScreen>
  );
};

export default Sdg;
