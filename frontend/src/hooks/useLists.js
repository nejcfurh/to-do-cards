import { useEffect, useState } from 'react';

export function useLists() {
  const [lists, setLists] = useState([]);
  const [daily, setDaily] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const query = await fetch(`${import.meta.env.VITE_LOCALHOST}/api/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await query.json();
      if (!data) throw new Error('Error fetching data!');
      setLists(data.data);
      setDaily(data.defaultListName);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return { lists, daily, isLoading, setIsLoading, setDaily, setLists };
}
