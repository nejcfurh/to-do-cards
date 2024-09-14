import React from 'react';
import styled from 'styled-components';
import { footerCopyright } from '../utils/constants';

const StyledFooter = styled.footer`
  color: #f1f1f191;
  text-align: center;
  font-size: 13px;
  margin-top: 55px;
  margin-bottom: 25px;
`;

const Footer = React.memo(function Footer() {
  return (
    <div>
      <StyledFooter>{footerCopyright}</StyledFooter>
    </div>
  );
});

export default Footer;
