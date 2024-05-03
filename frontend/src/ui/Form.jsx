import styled, { css } from 'styled-components';

const Form = styled.form`
  ${props =>
    props.type === 'regular' &&
    css`
      padding: 1.8rem 5rem;
      padding-top: 1rem;
      font-family: 'Poppins', sans-serif;
      width: 30rem;
      margin-bottom: 150px;
      zoom: 0.9;

      /* Box */
      border-radius: 10px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.9),
        rgba(255, 255, 255, 0.15)
      );
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: 0px 5px 25px 0px rgba(255, 255, 255, 0.2);
    `}

  ${props =>
    props.type === 'modal' &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: 'regular',
};

export default Form;
