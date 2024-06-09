import styled from 'styled-components';

const StyledHeader = styled.div`
  text-align: center;
  margin-top: 35px;
  margin-bottom: 30px;
  opacity: 85%;
`;

const StyledLogo = styled.img`
  max-width: 350px;
  max-height: 120px;
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
