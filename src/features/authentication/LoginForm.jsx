import { useState } from 'react';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import FormRowVertical from '../../ui/FormRowVertical';
import SpinnerMini from '../../ui/SpinnerMini';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import FormRowHorizontal from '../../ui/FormRowHorizontal';
import { HiMiniInformationCircle } from 'react-icons/hi2';
import { Tooltip } from 'react-tooltip';

function LoginForm() {
  const [email, setEmail] = useState('test@nejcfurh.dev');
  const [password, setPassword] = useState('nejc1234');
  const [isPending, setIsPending] = useState(false);
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async event => {
    event.preventDefault();
    setIsPending(true);

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json(); // Parse the JSON response

      if (response.ok) {
        console.log('Login Successful:', data.message);
        localStorage.setItem('token', data.token);
        toast.success('You are now logged in!');
        setIsAuthenticated(true); // Update authentication state
        const from = location.state?.from?.pathname || '/todos';
        navigate(from);
      } else {
        console.error('Login Failed:', data.message);
        toast.error(`Login failed! ${data.message}`);
      }
    } catch (error) {
      console.error('Login Error:', error.message);
      toast.error('Login Error:', error.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>
        Please log in to your account{' '}
        <span>
          <a className="tooltip">
            <HiMiniInformationCircle />
          </a>
          <Tooltip anchorSelect=".tooltip" place="bottom" clickable>
            <p
              style={{
                textAlign: 'center',
                fontSize: '12px',
                color: 'white',
                padding: '5px',
              }}
            >
              Email:{' '}
              <span style={{ textTransform: 'lowercase' }}>
                test@nejcfurh.dev
              </span>{' '}
              <br /> Password:{' '}
              <span style={{ textTransform: 'lowercase' }}>nejc1234</span>
            </p>
          </Tooltip>
        </span>
      </h3>
      <FormRowVertical label="Email">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={isPending}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          // This makes this form better for password managers
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={isPending}
        />
      </FormRowVertical>
      <FormRowHorizontal>
        <Button $size="small" $variation="primary" disabled={isPending}>
          {!isPending ? 'Log in' : <SpinnerMini />}
        </Button>
        <Button
          $size="small"
          $variation="secondary"
          onClick={() => navigate('/register')}
        >
          Sign Up
        </Button>
      </FormRowHorizontal>
    </Form>
  );
}

export default LoginForm;
