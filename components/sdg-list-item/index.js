import React from 'react';
import styled from 'styled-components/native';

import { sdgs } from '../../data/sdgs';

const SdgListItemContainer = styled.TouchableOpacity`
  height: 35px;
  justify-content: center;
  background-color: ${({ color }) => (color ? color : null)};
  border-radius: 12px;
  margin-bottom: 10px;
  width: 280px;
`;

const SdgNumber = styled.Text`
  color: white;
  font-size: 14px;
  margin: 0px 10px;
  width: 95%;
`;

function SdgListItem({ number, onPress }) {
  const info = sdgs.find((sdg) => sdg.number === number);

  return (
    <SdgListItemContainer color={info.color} onPress={() => onPress()}>
      <SdgNumber adjustsFontSizeToFit numberOfLines={1}>
        #{number} {info.name}
      </SdgNumber>
    </SdgListItemContainer>
  );
}

export default SdgListItem;
