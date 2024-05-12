import { useState } from 'react';
import SpinnerMini from '../../ui/SpinnerMini';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiMiniInformationCircle } from 'react-icons/hi2';
import { Tooltip } from 'react-tooltip';
import SocialMediaButtons from '../../ui/SocialMediaButtons';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async event => {
    event.preventDefault();
    setIsPending(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCALHOST}/api/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

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
        toast.error(
          `Please check your credentials or use social login options!`
        );
      }
    } catch (error) {
      console.error('Login Error:', error.message);
      toast.error('Login Error, please try again!');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form action="#" className="form-section" onSubmit={handleSubmit}>
        <div className="title-section">
          Sign in{' '}
          <a className="tooltip" style={{ fontSize: '20px' }}>
            <HiMiniInformationCircle />
          </a>
          <Tooltip anchorSelect=".tooltip" place="top" clickable>
            <p
              style={{
                textAlign: 'center',
                fontSize: '12px',
                color: 'white',
                padding: '4px',
              }}
            >
              Email:{' '}
              <span style={{ textTransform: 'lowercase' }}>test@test.dev</span>{' '}
              <br /> Password:{' '}
              <span style={{ textTransform: 'lowercase' }}>nejc1234</span>
            </p>
          </Tooltip>
        </div>
        <SocialMediaButtons />
        <span className="span-section"> or sign in using Email ...</span>
        <label className="label-section">
          <input
            type="email"
            // id="email"
            placeholder="Email"
            className="input-section"
            autoComplete="username"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={isPending}
          />
        </label>
        <label className="label-section">
          <input
            type="password"
            // id="password"
            placeholder="Password"
            className="input-section"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={isPending}
          />
        </label>
        {/* <a href="#">Forgot your password?</a> */}
        <button className="button" disabled={isPending}>
          {!isPending ? 'Sign in' : <SpinnerMini />}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
