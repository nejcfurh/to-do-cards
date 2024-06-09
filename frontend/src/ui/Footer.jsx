import React from 'react';
import styled from 'styled-components';

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
      <StyledFooter>
        © ToDoCards was designed and developed by Nejc Furh in 2024.
      </StyledFooter>
    </div>
  );
});

export default Footer;
