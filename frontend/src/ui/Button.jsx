import styled, { css } from 'styled-components';

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
    text-transform: uppercase;
    font-weight: 300;
    text-align: center;
    border-radius: 10px;
    align-self: center;
  `,
};

const variations = {
  primary: css`
    color: black;
    background-color: white;
    height: 60px;
    min-width: 100px;
    transition: all 0.3s ease-in-out;

    &:hover {
      opacity: 0.65;
      transition: all 0.3s ease-in-out;
    }
  `,
  secondary: css`
    color: white;
    background-color: black;
    height: 60px;
    opacity: 0.8;
    transition: all 0.3s ease-in-out;

    &:hover {
      opacity: 0.65;
      transition: all 0.3s ease-in-out;
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: 10px;
  box-shadow: lightgray;
  cursor: pointer;

  ${props => sizes[props.$size]}

  ${props => variations[props.$variation]}
`;

Button.defaultProps = {
  $variation: 'primary',
  $size: 'small',
};

export default Button;
