import {
  HiOutlineCheckCircle,
  HiOutlineClipboardList,
  HiOutlineViewList,
} from 'react-icons/hi';

/* eslint-disable react/prop-types */
const ProfileTable = ({ lists }) => {
  return (
    <table className="profile-table">
      <thead>
        <tr>
          <th>
            <div className="table-row">
              <HiOutlineViewList />
              <p>Lists</p>
            </div>
          </th>
          <th>
            <div className="table-row">
              <HiOutlineClipboardList />
              <p>Tasks</p>
            </div>
          </th>
          <th>
            <div className="table-row">
              <HiOutlineCheckCircle />
              <p>Completed</p>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {lists.map((list, index) => (
          <tr key={index}>
            <td className="list-name">{list.name}</td>
            <td>
              {!list.items.length
                ? 'No active tasks!'
                : list?.items?.length === 1
                ? list?.items?.length + ' active task'
                : list?.items?.length + ' active tasks'}
            </td>
            <td>
              {!list.completedItems.length
                ? 'None completed!'
                : list?.completedItems?.length === 1
                ? list?.completedItems?.length + ' task completed'
                : list?.completedItems?.length + ' tasks completed'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProfileTable;
