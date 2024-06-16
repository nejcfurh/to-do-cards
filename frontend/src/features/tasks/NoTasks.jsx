/* eslint-disable react/prop-types */
function NoTasks({ noItems, noCompletedItems }) {
  const noTasksString = 'No tasks yet! Create a task below...';
  const noCompletedTasksString = 'No tasks on this list were completed yet!';

  return (
    <div className="card-task-line" style={{ width: 'auto' }}>
      <button
        className="card-task-box"
        name="noname"
        type="submit"
        value="notask"
      >
        {noItems === 0 || noCompletedItems === 0 ? null : (
          <img className="complete-icon" src="../photos/completeIcon.png" />
        )}
      </button>
      <p className="card-task-name">
        {noItems === undefined ? noCompletedTasksString : noTasksString}
      </p>
    </div>
  );
}

export default NoTasks;
