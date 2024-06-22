import toast from 'react-hot-toast';
import NoTasks from './NoTasks';
import { HiOutlineTrash } from 'react-icons/hi2';

/* eslint-disable react/prop-types */
function CompletedItem({ completedItems, listName, setLists, setDaily }) {
  const handleDeleteTask = async (event, listName, itemId) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${import.meta.env.VITE_LOCALHOST}/api/todos/deleteItem`,
        {
          method: 'DELETE',
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
      toast.success('Task successfully deleted!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Task could not be deleted!');
    }
  };

  return (
    <form className="card-task">
      {completedItems.length === 0 ? (
        <NoTasks noCompletedItems={completedItems.length} />
      ) : (
        completedItems.map((completedItem, index) => {
          const { name, date, _id } = completedItem;
          const dateObject = new Date(date);
          return (
            <div key={index} className="card-task-line-completed">
              <HiOutlineTrash
                onClick={e => handleDeleteTask(e, listName, _id)}
                className="completed-task-delete"
              />
              <p className="card-task-name-completed">
                <strong>{name}</strong> was completed on{' '}
                <strong>{dateObject.toLocaleDateString('en-US')}</strong>.
              </p>
            </div>
          );
        })
      )}
    </form>
  );
}

export default CompletedItem;
