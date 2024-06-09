import { useState } from 'react';
import SpinnerMini from '../../ui/SpinnerMini';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SocialMediaButtons from '../../ui/SocialMediaButtons';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    setIsPending(true);

    const data = { email, password, name };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCALHOST}/api/register`,
        requestOptions
      );
      const responseData = await response.json();

      if (response.ok) {
        localStorage.setItem('token', responseData.token); // Store the received token
        setIsAuthenticated(true); // Update authentication state if you have such a function/context
        toast.success('Registration successful! You are now logged in!');
        navigate('/todos'); // Navigate to a protected route or home page
      } else {
        toast.error(`Failed to register user: Email already in use!`);
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="form-container sign-up-container">
      <form action="#" onSubmit={handleSubmit}>
        <div className="title-section">Sign up</div>
        <SocialMediaButtons />
        <span className="span-section">
          or use your Email for registration ...
        </span>
        <label className="label-section">
          <input
            placeholder="Name"
            className="input-section"
            id="name"
            // This makes this form better for password managers
            autoComplete="name"
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={isPending}
            required={true}
          />
        </label>
        <label className="label-section">
          <input
            type="email"
            id="email"
            // This makes this form better for password managers
            // autoComplete="username"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={isPending}
            placeholder="Email"
            className="input-section"
          />
        </label>
        <label className="label-section">
          <input
            type="password"
            id="password"
            // This makes this form better for password managers
            // autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={isPending}
            placeholder="Password"
            className="input-section"
          />
        </label>
        <button className="button" disabled={isPending}>
          {!isPending ? 'Sign up' : <SpinnerMini />}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
