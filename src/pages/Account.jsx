import { useEffect, useState } from 'react';
import Footer from '../ui/Footer';
import PrivateHeader from '../ui/PrivateHeader';
import Spinner from '../ui/Spinner';
import AccountInformation from '../ui/AccountInformation';

function Account() {
  const [userInformation, setUserInformation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/account', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch data');
        }
        setUserInformation(data);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <>
        <PrivateHeader />
        <Spinner />
        <Footer />
      </>
    );
  }
  if (error) {
    return (
      <>
        <PrivateHeader />
        <div>Error: {error}</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <PrivateHeader />
      <AccountInformation userInformation={userInformation} />
      <Footer />
    </>
  );
}

export default Account;
