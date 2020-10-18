import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Container = styled.View`
  align-items: center;
  margin: 10px 0px;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  background-color: #feec00;
  padding: 15px 40px;
  border-radius: 40px;
  max-width: 320px;
`;

const ButtonTitle = styled.Text`
  font-size: 18px;
  font-family: 'Montserrat_700Bold';
`;

const Button = ({ title, onPress }) => (
  <Container>
    <StyledTouchableOpacity onPress={onPress}>
      <ButtonTitle>{title}</ButtonTitle>
    </StyledTouchableOpacity>
  </Container>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Button;
