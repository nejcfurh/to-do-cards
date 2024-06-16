import NoTasks from './NoTasks';

/* eslint-disable react/prop-types */
function CompletedItem({ completedItems }) {
  return (
    <form className="card-task">
      {completedItems.length === 0 ? (
        <NoTasks noCompletedItems={completedItems.length} />
      ) : (
        completedItems.map((completedItem, index) => {
          const { name, date } = completedItem;
          const dateObject = new Date(date);
          return (
            <div key={index} className="card-task-line-completed">
              <p className="card-task-name-completed">
                <strong>{name}</strong> was completed on{' '}
                <strong>{dateObject.toLocaleDateString('en-US')}.</strong>
              </p>
            </div>
          );
        })
      )}
    </form>
  );
}

export default CompletedItem;
