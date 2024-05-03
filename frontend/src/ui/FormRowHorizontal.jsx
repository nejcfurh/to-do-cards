/* eslint-disable react/prop-types */
import styled from 'styled-components';

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1.5rem 0 0.6rem;
  gap: 0.5rem;
  justify-content: space-between;
`;

const Label = styled.label`
  font-weight: 800;
  font-size: 1.1rem;
  text-transform: capitalize;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRowHorizontal({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowHorizontal;
