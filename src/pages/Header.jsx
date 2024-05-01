import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledHeader = styled.div`
  display: 'flex';
  justify-content: 'space-around';
`;

const StyledNavbar = styled.nav`
  display: flex;
  flex-direction: row;
  padding: 0px 50px 0px 50px;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 3%;
`;

const StyledLogo = styled.div`
  letter-spacing: -1px;
  font-family: 'Poppins', sans-serif;
`;

function Header() {
  return (
    <>
      <StyledLogo />
      <StyledHeader />
      <StyledNavbar className="navbar">
        <h1 className="navbar-logo">
          <Link className="logo-link" to="/">
            What do I have to do?
          </Link>
        </h1>
        {/* <div className="navbar-links">
          <h2 className="navbar-link">
            <a href="/">Home</a>
          </h2>
          <h2 className="navbar-link">
            <a href="/about">About</a>
          </h2>
          <h2 className="navbar-link">
            <a href="/contact">Contact</a>
          </h2>
        </div> */}
      </StyledNavbar>
    </>
  );
}

export default Header;
