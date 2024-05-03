import styled from 'styled-components';

const StyledHeader = styled.div`
  text-align: center;
  margin-top: 60px;
  margin-bottom: 40px;
`;

const StyledLogo = styled.img`
  max-width: 400px;
  max-height: 140px;
`;

function PublicHeader() {
  return (
    <>
      <StyledHeader>
        <StyledLogo src="../photos/LogoDark.png" />
      </StyledHeader>
    </>
  );
}

export default PublicHeader;
