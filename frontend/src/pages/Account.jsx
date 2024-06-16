import { useEffect, useState } from 'react';
import Footer from '../ui/Footer';
import PrivateHeader from '../ui/PrivateHeader';
import Spinner from '../ui/Spinner';
import AccountInformation from '../ui/AccountInformation';

function Account() {
  const [userInformation, setUserInformation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${import.meta.env.VITE_LOCALHOST}/api/account`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch data');
      }
      setUserInformation(data);
      setAvatar(data.data.avatar);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshAvatar = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCALHOST}/api/account`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setAvatar(data.data.avatar);
      }
    } catch (error) {
      console.error('Error fetching avatar:', error);
    }
  };

  if (isLoading) {
    return (
      <>
        <PrivateHeader />
        <div className="cards-box">
          <div className="wrapper">
            <Spinner />
          </div>
        </div>
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
      <div className="cards-box">
        <div className="wrapper">
          <AccountInformation
            userInformation={{
              ...userInformation,
              data: { ...userInformation.data, avatar },
            }}
            refreshAvatar={refreshAvatar}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Account;
