/* eslint-disable react/prop-types */
import { getDate } from '../../utils/helpers';
import Card from './Card';
import AddCustomList from './AddCustomList';
import toast from 'react-hot-toast';
import PageNotFound from '../../pages/PageNotFound';
import { deleteImageSupabase } from '../../services/apiSupabase';
import { useLists } from '../../hooks/useLists';

function CardContainer() {
  const { lists, daily, isLoading, setDaily, setLists } = useLists();
  const day = getDate();

  if (isLoading) return <PageNotFound />;

  // DELETING THE CARD
  const handleDelete = async (event, listId) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${import.meta.env.VITE_LOCALHOST}/api/todos/deleteCard`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ listId }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setLists(data.data);
        setDaily(data.defaultListName);
        toast.success('List has been successfully deleted!');
        // Delete background from Supabase as well
        deleteImageSupabase(data.image);
      } else {
        console.error('Failed to delete card');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // COMPLETING THE TASK
  const handleCompleteTask = async (event, listName, itemId) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${import.meta.env.VITE_LOCALHOST}/api/todos/completeItem`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ listName, itemId }),
        }
      );
      if (!response.ok) throw new Error('Failed to delete');
      const data = await response.json();
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
            handleCompleteTask={handleCompleteTask}
          />
        );
      })}
      <AddCustomList setDaily={setDaily} setLists={setLists} />
    </div>
  );
}

export default CardContainer;
