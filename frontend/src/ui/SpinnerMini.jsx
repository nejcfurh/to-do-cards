import styled, { keyframes } from 'styled-components';
import { BiLoaderAlt } from 'react-icons/bi';

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const SpinnerMini = styled(BiLoaderAlt)`
  width: 0.9rem;
  height: 0.9rem;
  animation: ${rotate} 1.5s infinite linear;
  padding: 0;
  padding-left: 1.2rem;
  padding-right: 1.2rem;
`;

export default SpinnerMini;
