import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

import { Heading } from '../../components/typography';
import Screen from '../../components/screen';
import { colors } from '../../constants/colors';

const HeaderContainer = styled.View`
  background-color: ${({ headerColor }) => (headerColor ? headerColor : colors.darkgray)};
  flex-shrink: 1;
  padding: ${({ heading }) => (heading ? '40px 0 60px 20px' : '0')};
`;

const ImageHeaderContainer = styled.View`
  height: 220px;
`;

const SdgImage = styled.Image`
  height: 150px;
  width: 150px;
  margin: 10px 0 30px 10px;
`;

const HeaderImage = styled.Image`
  height: 100%;
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
        {!headerImage ? (
          <ScreenWithHeading headerColor={headerColor} heading={heading} sdgImageSrc={sdgImageSrc} />
        ) : (
          <ScreenWithHeaderImage headerImage={headerImage} />
        )}
        <BodyContainer>{children}</BodyContainer>
      </ScrollView>
    </Screen>
  );
};

const ScreenWithHeading = ({ headerColor, heading, sdgImageSrc }) => {
  return (
    <HeaderContainer headerColor={headerColor} heading={heading}>
      {sdgImageSrc && <SdgImage source={sdgImageSrc} resizeMode="contain" />}
      {heading && <Heading primary>{heading}</Heading>}
    </HeaderContainer>
  );
};

const ScreenWithHeaderImage = ({ headerImage }) => {
  return (
    <ImageHeaderContainer headerImage={headerImage}>
      {headerImage && <HeaderImage source={headerImage} resizeMode="cover" />}
    </ImageHeaderContainer>
  );
};

ChildScreen.propTypes = {
  children: PropTypes.node.isRequired,
  headerColor: PropTypes.string,
  heading: PropTypes.string,
  sdgImageSrc: PropTypes.node,
  headerImage: PropTypes.object,
};

export default ChildScreen;
