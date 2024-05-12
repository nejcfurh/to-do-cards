// OAuthSuccess.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpinnerMini from '../../ui/SpinnerMini';

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      // Directly navigate to todos as token should now be set
      navigate('/todos');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return <SpinnerMini />;
};

export default OAuthSuccess;
