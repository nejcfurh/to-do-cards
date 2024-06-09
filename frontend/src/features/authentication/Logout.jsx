import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineLogout } from 'react-icons/hi';

function Logout() {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <Link to="/contact" className="navbar-link" onClick={logout}>
      <HiOutlineLogout className="header-icon" />
      <div className="navbar-link-title">Logout</div>
    </Link>
  );
}

export default Logout;
