import React from 'react';
import { Text } from 'react-native';

import ChildScreen from '../../components/child-screen';

const Sdg = ({ route }) => {
  const { sdg } = route.params;

  return (
    <ChildScreen headerColor={sdg.color} sdgImageSrc={sdg.src}>
      <Text>{sdg.description}</Text>
    </ChildScreen>
  );
};

export default Sdg;
