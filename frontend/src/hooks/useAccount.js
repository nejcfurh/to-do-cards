import { useEffect, useState } from 'react';

export function useAccount() {
  const [userInformation, setUserInformation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
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
    fetchData();
  }, []);

  return { userInformation, isLoading, error, avatar, setAvatar };
}
