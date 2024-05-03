/* eslint-disable react/prop-types */
import AddTask from './AddTask';
import TaskItem from './TaskItem';

function Tasks({
  handleDeleteTask,
  handleCreate,
  _id,
  list,
  setLists,
  setDaily,
}) {
  const { items } = list;
  return (
    <div className="card-form-tasks">
      <TaskItem
        handleDeleteTask={handleDeleteTask}
        listName={list.name}
        items={items}
        _id={_id}
      />
      <AddTask
        list={list}
        handleCreate={handleCreate}
        setLists={setLists}
        setDaily={setDaily}
      />
    </div>
  );
}

export default Tasks;
