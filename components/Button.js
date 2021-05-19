import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Container = styled.View`
  align-items: center;
  margin: 10px 0px;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  background-color: ${({ disabled }) => (disabled ? '#d3d3d3' : '#feec00')}
  padding: 15px 40px;
  border-radius: 40px;
  max-width: 320px;
`;

const ButtonTitle = styled.Text`
  color: ${({ disabled }) => (disabled ? '#606060' : '#000000')}
  font-size: 18px;
  font-family: 'Montserrat_700Bold';
`;

const Button = ({ title, onPress, disabled }) => (
  <Container>
    <StyledTouchableOpacity disabled={disabled} onPress={disabled ? null : onPress}>
      <ButtonTitle disabled={disabled}>{title}</ButtonTitle>
    </StyledTouchableOpacity>
  </Container>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

export { Button };
