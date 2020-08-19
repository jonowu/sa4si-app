import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

import Screen from '../../components/screen';

const HeaderContainer = styled.View`
  background-color: ${({ headerColor }) => headerColor};
  ${({ headerImage }) => headerImage && 'max-height: 30%;'}
  ${({ headerImage }) => !headerImage && 'flex-shrink: 1'};
`;

const SdgImage = styled.Image`
  height: 150px;
  width: 150px;
  margin: 10px 0 30px 10px;
`;

const HeaderImage = styled.Image`
  height: 100%;
`;

const Heading = styled.Text`
  color: white;
  font-size: 20px;
  margin: 40px 0 60px 20px;
  font-weight: 600;
`;

const BodyContainer = styled.View`
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  flex-grow: 1;
  margin-top: -20px;
  padding: 20px;
`;

const ChildScreen = ({ headerColor, sdgImageSrc, children, heading, headerImage }) => {
  return (
    <Screen>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <HeaderContainer headerColor={headerColor} headerImage={headerImage}>
          {sdgImageSrc && <SdgImage source={sdgImageSrc} resizeMode="contain" />}
          {heading && <Heading>{heading}</Heading>}
          {headerImage && <HeaderImage source={headerImage} resizeMode="cover" />}
        </HeaderContainer>
        <BodyContainer>{children}</BodyContainer>
      </ScrollView>
    </Screen>
  );
};

ChildScreen.propTypes = {
  children: PropTypes.node.isRequired,
  headerColor: PropTypes.string,
  heading: PropTypes.string,
  sdgImageSrc: PropTypes.node,
  headerImage: PropTypes.object,
};

ChildScreen.defaultProps = {
  headerColor: 'gray',
};

export default ChildScreen;
