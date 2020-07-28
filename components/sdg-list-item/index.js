import { Text } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

import { sdgs } from '../../data';

const SdgNumber = styled.Text`
  background-color: ${({ color }) => (color ? color : null)};
  color: white;
`;

function SdgListItem({ number }) {
  const info = sdgs.find((sdg) => sdg.number === number);

  return (
    <Text>
      <SdgNumber color={info.color}> {number} </SdgNumber>
      <Text> {info.name}</Text>
    </Text>
  );
}

export default SdgListItem;
