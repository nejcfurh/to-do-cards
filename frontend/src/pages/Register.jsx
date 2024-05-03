import styled from 'styled-components';
import Footer from '../ui/Footer';
import RegisterForm from '../features/authentication/RegisterForm';
import PublicHeader from '../ui/PublicHeader';

const LoginLayout = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

function Register() {
  return (
    <LoginLayout>
      <PublicHeader />
      <RegisterForm />
      <Footer />
    </LoginLayout>
  );
}

export default Register;
