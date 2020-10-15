import styled from 'styled-components/native';
import { colors } from '../../constants/colors';

const Core = styled.Text``;

const H = styled(Core)``;

const H1 = styled(H)`
  font-size: 36px;
`;

const H2 = styled(H)`
  font-size: 28px;
`;

const H3 = styled(H)`
  font-size: 22px;
`;

const H4 = styled(H)`
  font-size: 20px;
`;

const H5 = styled(H)`
  font-size: 18px;
`;

const Heading = styled(Core)`
  color: ${({ color }) => (color ? color : colors.yellow)};
  font-weight: bold;
  font-size: ${({ variant }) => {
    switch (variant) {
      default:
      case 1:
        return '36px';
      case 2:
        return '28px';
      case 3:
        return '22px';
      case 4:
        return '18px';
      case 5:
        return '16px';
    }
  }};
`;

const Subheading = styled(Core)`
  color: ${({ color }) => (color ? color : colors.black)};
  font-weight: bold;
  font-size: ${({ variant }) => {
    switch (variant) {
      default:
      case 1:
        return '20px';
      case 2:
        return '18px';
      case 3:
        return '16px';
      case 4:
        return '14px';
      case 5:
        return '12px';
    }
  }};
`;

const Body = styled(Core)`
  color: ${({ color }) => (color ? color : colors.black)};
  font-size: ${({ variant }) => {
    switch (variant) {
      default:
      case 1:
        return '20px';
      case 2:
        return '18px';
      case 3:
        return '16px';
      case 4:
        return '14px';
      case 5:
        return '12px';
    }
  }};
`;

const Label = styled(Core)`
  font-size: 12px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  font-weight: bold;
`;

export { H1, H2, H3, H4, H5, Heading, Subheading, Body, Label };
