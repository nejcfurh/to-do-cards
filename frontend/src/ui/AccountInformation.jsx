import ProfileTable from './ProfileTable';
import ProfileImage from './ProfileImage.jsx';

/* eslint-disable react/prop-types */
function AccountInformation({ userInformation, refreshAvatar }) {
  const { name, email, lists, avatar } = userInformation.data;

  return (
    <div className="account-box">
      <div className="profile-card">
        <div className="profile-top">
          <div className="profile-image">
            <ProfileImage avatar={avatar} refreshAvatar={refreshAvatar} />
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
