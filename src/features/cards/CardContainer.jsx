/* eslint-disable react/prop-types */
import { getDate } from '../../utils/helpers';
import { useEffect, useState } from 'react';
import Card from './Card';
import AddCustomList from './AddCustomList';
import Spinner from '../../ui/Spinner';
import toast from 'react-hot-toast';

function CardContainer() {
  const [lists, setLists] = useState([]);
  const [daily, setDaily] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const day = getDate();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const query = await fetch('http://localhost:3000/api/todos');
      const data = await query.json();
      if (!data) throw new Error('Error fetching data!');
      setLists(data.data);
      setDaily(data.defaultListName);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (isLoading) return <Spinner />;

  // DELETING THE CARD
  const handleDelete = (event, listId) => {
    event.preventDefault();
    fetch(`http://localhost:3000/api/todos/deleteCard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ card: listId }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // console.log('Success', data);
          setLists(data.data);
          setDaily(data.defaultListName);
          toast.success('List has been successfully deleted!');
        } else {
          console.error('Failed to delete card');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  // DELETING THE TASK
  const handleDeleteTask = async (event, listName, itemId) => {
    event.preventDefault();

    try {
      const response = await fetch(
        'http://localhost:3000/api/todos/deleteItem',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ listName, itemId }),
        }
      );

      if (!response.ok) throw new Error('Failed to delete');

      const data = await response.json();
      // console.log('Updated list after deletion:', data);
      setLists(data.data);
      setDaily(data.defaultListName);
      toast.success('Task completed! Great job!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Task could not be completed!');
    }
  };

  return (
    <div className="container-cards">
      {lists.map((list, i) => {
        return (
          <Card
            list={list}
            key={i}
            index={i}
            day={day}
            daily={daily}
            setLists={setLists}
            setDaily={setDaily}
            handleDelete={handleDelete}
            // handleCreate={handleCreate}
            handleDeleteTask={handleDeleteTask}
          />
        );
      })}
      <AddCustomList setDaily={setDaily} setLists={setLists} />
    </div>
  );
}

export default CardContainer;
