import styled from 'styled-components';
// import LoginForm from '../features/authentication/LoginForm';
import Footer from '../ui/Footer';
import PublicHeader from '../ui/PublicHeader';
import LoginRegister from './LoginRegister';

const LoginLayout = styled.main`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

function Login() {
  return (
    <LoginLayout>
      <PublicHeader />
      <LoginRegister />
      <Footer />
    </LoginLayout>
  );
}

export default Login;
