import React from 'react';
import Confetti from 'react-confetti';

export const ConfettiElement = () => {
  return <Confetti recycle={false} colors={['#DC2D27', '#FEEC00', '#33FFA2', '#3396FF']} />;
};
