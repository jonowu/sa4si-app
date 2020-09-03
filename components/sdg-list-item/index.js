import { TouchableOpacity } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

import { sdgs } from '../../data/sdgs';

const SdgNumber = styled.Text`
  background-color: ${({ color }) => (color ? color : null)};
  color: white;
`;

function SdgListItem({ number, onPress }) {
  const info = sdgs.find((sdg) => sdg.number === number);

  return (
    <TouchableOpacity onPress={() => onPress()}>
      <SdgNumber color={info.color}>
        {number} {info.name}
      </SdgNumber>
    </TouchableOpacity>
  );
}

export default SdgListItem;
