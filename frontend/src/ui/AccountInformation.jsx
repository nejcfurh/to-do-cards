/* eslint-disable react/prop-types */
function AccountInformation({ userInformation }) {
  const { name, email, lists } = userInformation.data;

  return (
    <div className="account-box">
      <div className="profile-card">
        <div className="profile-image">
          <img className="profile-pic" src="../photos/DefaultUser.png" />
        </div>
        <div className="profile-data">
          <h1>{name}</h1>
          <h2>{email}</h2>
        </div>
        <div className="profile-row">
          <div className="profile-information">
            <h4>Lists</h4>
            <span style={{ fontSize: '20px' }}>{lists.length}</span>
          </div>
          <div className="profile-information">
            <h4>Tasks</h4>
            <span style={{ fontSize: '20px' }}>
              {lists
                .map(list => list.items.length)
                .reduce((cur, acc) => cur + acc, 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountInformation;
