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
  const [viewPassword, setViewPassword] = useState(false);

  const handlePasswordVisibility = e => {
    e.preventDefault();
    setViewPassword(() => !viewPassword);
  };

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
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form action="#" className="form-section" onSubmit={handleSubmit}>
        <div className="title-section">
          Sign in{' '}
          <a className="tooltip" style={{ fontSize: '18px' }}>
            <HiMiniInformationCircle />
          </a>
          <Tooltip anchorSelect=".tooltip" place="top" clickable>
            <p
              style={{
                textAlign: 'center',
                fontSize: '12px',
                color: 'white',
                padding: '2px',
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
        <div className="box-input">
          <div className="input__wrapper">
            <input
              // id="email"
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="input__field"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={isPending}
            />
            {/* quickfix for css cascading of label element - it broke the main page if used as label */}
            <output htmlFor="password" className="input__label">
              Email
            </output>
          </div>
          <br />
          <div className="input__wrapper">
            <input
              // id="password"
              type={viewPassword ? 'text' : 'password'}
              name="password"
              placeholder="Your Password"
              required
              className="input__field"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={isPending}
            />
            <output htmlFor="password" className="input__label">
              Password
            </output>
            <img
              alt="Toggle View"
              title="Eye Icon"
              src={viewPassword ? 'photos/eye-off.svg' : 'photos/eye.svg'}
              className="input__icon"
              onClick={handlePasswordVisibility}
            />
          </div>
        </div>
        {/* <a href="#">Forgot your password?</a> */}
        <button
          className="button"
          style={{ marginTop: '2.5rem' }}
          disabled={isPending}
        >
          {!isPending ? 'Sign in' : <SpinnerMini />}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
