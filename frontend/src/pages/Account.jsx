import Footer from '../ui/Footer';
import PrivateHeader from '../ui/PrivateHeader';
import Spinner from '../ui/Spinner';
import AccountInformation from '../ui/AccountInformation';
import { useAccount } from '../hooks/useAccount';

function Account() {
  const { userInformation, isLoading, error, avatar, setAvatar } = useAccount();

  const handleNewAvatar = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCALHOST}/api/account`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setAvatar(data.data.avatar);
      }
    } catch (error) {
      console.error('Error fetching avatar:', error);
    }
  };

  if (isLoading) {
    return (
      <>
        <PrivateHeader />
        <div className="cards-box">
          <div className="wrapper">
            <Spinner />
          </div>
        </div>
        <Footer />
      </>
    );
  }
  if (error) {
    return (
      <>
        <PrivateHeader />
        <div>Error: {error}</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <PrivateHeader />
      <div className="cards-box">
        <div className="wrapper">
          <AccountInformation
            userInformation={{
              ...userInformation,
              data: { ...userInformation.data, avatar },
            }}
            refreshAvatar={handleNewAvatar}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Account;
