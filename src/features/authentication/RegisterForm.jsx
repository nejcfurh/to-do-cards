import { useState } from 'react';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import FormRowVertical from '../../ui/FormRowVertical';
import SpinnerMini from '../../ui/SpinnerMini';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FormRowHorizontal from '../../ui/FormRowHorizontal';

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
        'http://localhost:3000/api/register',
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
    <Form onSubmit={handleSubmit}>
      <h3>Register your account</h3>
      <FormRowVertical label="Name">
        <Input
          type="name"
          id="name"
          // This makes this form better for password managers
          autoComplete="name"
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={isPending}
          required={true}
        />
      </FormRowVertical>
      <FormRowVertical label="Email address">
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
          {!isPending ? 'Register' : <SpinnerMini />}
        </Button>
        <Button
          $size="small"
          $variation="secondary"
          onClick={() => navigate('/login')}
        >
          Log in
        </Button>
      </FormRowHorizontal>
    </Form>
  );
}

export default RegisterForm;
