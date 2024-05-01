/* eslint-disable react/prop-types */
function NoTasks({ noItems }) {
  const noTasksString = 'No tasks yet! Create a task below...';

  return (
    <div className="card-task-line" style={{ width: 'auto' }}>
      <button
        className="card-task-box"
        name="noname"
        type="submit"
        value="notask"
      >
        {noItems === 0 ? null : (
          <img
            className="complete-icon"
            src="src/assets/photos/completeIcon.png"
          />
        )}
      </button>
      <p className="card-task-name">{noTasksString}</p>
    </div>
  );
}

export default NoTasks;
