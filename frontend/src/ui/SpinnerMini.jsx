import styled, { keyframes } from 'styled-components';
import { BiLoaderAlt } from 'react-icons/bi';

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const SpinnerMini = styled(BiLoaderAlt)`
  width: 0.8rem;
  height: 0.8rem;
  animation: ${rotate} 1.5s infinite linear;
  padding: 0;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

export default SpinnerMini;
