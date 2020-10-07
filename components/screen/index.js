import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const StyledView = styled.View`
  flex: 1;
  align-items: ${({ centeredHorizontally }) => (centeredHorizontally ? 'center' : 'stretch')};
  justify-content: ${({ centeredVertically }) => (centeredVertically ? 'center' : 'flex-start')};
`;

const Screen = ({ children, scrollable, centeredHorizontally, centeredVertically }) => {
  return (
    <StyledSafeAreaView>
      {scrollable ? (
        <ScrollView
          centeredHorizontally={centeredHorizontally}
          centeredVertically={centeredVertically}
          contentContainerStyle={{
            alignItems: centeredHorizontally ? 'center' : 'stretch',
            justifyContent: centeredVertically ? 'center' : 'flex-start',
            flex: 1,
          }}
        >
          {children}
        </ScrollView>
      ) : (
        <StyledView centeredHorizontally={centeredHorizontally} centeredVertically={centeredVertically}>
          {children}
        </StyledView>
      )}
    </StyledSafeAreaView>
  );
};

Screen.propTypes = {
  children: PropTypes.node.isRequired,
  scrollable: PropTypes.bool,
  centeredHorizontally: PropTypes.bool,
  centeredVertically: PropTypes.bool,
};

Screen.defaultProps = {
  scrollable: false,
  centeredHorizontally: false,
  centeredVertically: false,
};

export default Screen;
