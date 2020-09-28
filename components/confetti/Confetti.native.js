import React, { Component } from 'react';
import Confetti from 'react-native-confetti';

export class ConfettiElement extends Component {
  componentDidMount() {
    if (this._confettiView) {
      this._confettiView.startConfetti();
    }
  }

  render() {
    return (
      <Confetti
        ref={(node) => (this._confettiView = node)}
        size={2}
        duration={1500}
        timeout={2}
        confettiCount={30}
        colors={['#DC2D27', '#FEEC00', '#33FFA2', '#3396FF']}
      />
    );
  }
}
