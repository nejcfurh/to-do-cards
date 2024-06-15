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

/* eslint-disable react/prop-types */
function AccountInformation({ userInformation }) {
  const { name, email, lists } = userInformation.data;

  return (
    <div className="account-box">
      <div className="profile-card">
        <div className="profile-top">
          <div className="profile-image">
            <img className="profile-pic" src="../photos/DefaultUser.png" />
          </div>
          <div className="profile-data">
            <p className="profile-item-name">Name:</p>
            <h1 className="profile-title">{name}</h1>
            <p className="profile-item-name">Email / Auth:</p>
            <h2 className="profile-auth">{email}</h2>
          </div>
        </div>
        <hr />
        <div className="profile-row">
          <ProfileTable lists={lists} />
        </div>
      </div>
    </div>
  );
}

export default AccountInformation;
