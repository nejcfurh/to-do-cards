import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  HiOutlineInformationCircle,
  HiOutlineMegaphone,
  HiOutlineUserCircle,
} from 'react-icons/hi2';
import Logout from '../features/authentication/Logout';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StyledNavbar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 15px 150px 25px 150px;
  zoom: 0.85;
  /* margin-top: 3%; */
`;

const StyledLogo = styled.img`
  max-width: 350px;
  max-height: 120px;
`;

const PrivateHeader = React.memo(function PrivateHeader() {
  return (
    <>
      <StyledHeader />
      <StyledNavbar className="navbar">
        <h1 className="navbar-logo">
          <Link className="logo-link" to="/">
            <StyledLogo src="../photos/LogoDark.png" />
          </Link>
        </h1>
        <div className="navbar-links">
          <Link to="/account" className="navbar-link">
            <HiOutlineUserCircle className="header-icon" />
            <div className="navbar-link-title">Account</div>
          </Link>
          <Link to="/about" className="navbar-link">
            <HiOutlineInformationCircle className="header-icon" />
            <div className="navbar-link-title">About</div>
          </Link>
          <Link to="/contact" className="navbar-link">
            <HiOutlineMegaphone className="header-icon" />
            <div className="navbar-link-title">Contact</div>
          </Link>
          <Logout />
        </div>
      </StyledNavbar>
    </>
  );
});

export default PrivateHeader;
