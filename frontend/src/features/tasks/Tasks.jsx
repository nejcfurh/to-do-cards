/* eslint-disable react/prop-types */
import AddTask from './AddTask';
import TaskItem from './TaskItem';
import CompletedItem from './CompletedItem';

function Tasks({
  handleDeleteTask,
  handleCreate,
  _id,
  list,
  setLists,
  setDaily,
  active,
}) {
  const { items, completedItems } = list;

  if (!active) {
    return (
      <div className="card-form-tasks">
        <CompletedItem completedItems={completedItems} />
      </div>
    );
  }

  return (
    <div className="card-form-tasks">
      <TaskItem
        handleDeleteTask={handleDeleteTask}
        listName={list.name}
        items={items}
        completedItems={completedItems}
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
