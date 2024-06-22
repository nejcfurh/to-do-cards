/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import NoTasks from './NoTasks';

function TaskItem({ handleCompleteTask, listName, _id, items }) {
  return (
    <form
      className="card-task"
      onSubmit={e => handleCompleteTask(e, listName, _id)}
    >
      {items.length === 0 ? (
        <NoTasks noItems={items.length} />
      ) : (
        items.map((item, index) => {
          const { name, _id: item_id } = item;
          return (
            <div key={index} className="card-task-line">
              <button
                className="card-task-box"
                name={name}
                type="button"
                value={item_id}
                onClick={e => handleCompleteTask(e, listName, item_id)}
              >
                <img
                  className="complete-icon"
                  src="../photos/completeIcon.png"
                />
              </button>
              <p className="card-task-name"> {name}</p>
            </div>
          );
        })
      )}
    </form>
  );
}

export default TaskItem;
