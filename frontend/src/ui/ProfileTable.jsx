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
            <HiOutlineViewList />
          </th>
          <th>
            <HiOutlineClipboardList />
          </th>
          <th>
            <HiOutlineCheckCircle />
          </th>
        </tr>
      </thead>
      <tbody>
        {lists.map((list, index) => (
          <tr key={index}>
            <td className="list-name">{list.name}</td>
            <td>{list.items.length}</td>
            <td>{list.completedItems.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProfileTable;
