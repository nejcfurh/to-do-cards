import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledFooter = styled.footer`
  color: #f1f1f191;
  text-align: center;
  font-size: 13px;
  margin-top: auto;
  padding-bottom: 30px;
`;

function Footer() {
  return (
    <div>
      <StyledFooter>
        ©{' '}
        <Link className="link-footer" to="/about">
          ToDoCards
        </Link>{' '}
        was designed and developed {<br />}by{' '}
        <Link className="link-footer" to="/contact">
          Nejc Furh{' '}
        </Link>
        in 2024.
      </StyledFooter>
    </div>
  );
}

export default Footer;
